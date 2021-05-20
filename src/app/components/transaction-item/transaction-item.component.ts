import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonItem, IonSelect, LoadingController } from '@ionic/angular';
import { Category } from 'src/app/api-interfaces/category';
import { Transaction } from 'src/app/api-interfaces/transaction';
import { CategoriesService } from 'src/app/services/categories.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
})
export class TransactionItemComponent implements OnInit, AfterViewInit {

  constructor(
    private categoriesService: CategoriesService,
    private transactionsService: TransactionsService,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController
  ) { }

  @ViewChild('selectCategory', { static: false }) selectCategory: IonSelect;
  @ViewChildren(TransactionItemComponent) childrenList: QueryList<TransactionItemComponent>;

  @Input() transaction = new Transaction();
  @Input() parent: Transaction = null;
  @Input() state: 'edit' | 'view' = 'view';
  @Input() date: string;

  @Output() afterSave = new EventEmitter<Transaction[]>();
  @Output() evAddChild = new EventEmitter<void>();
  @Output() evAmountChange = new EventEmitter<number>();
  @Output() evCancel = new EventEmitter<void>();

  form: FormGroup;

  categories: Promise<Category[]>;

  children: Transaction[] = [];

  _originalAmount: number;
  _lockAmount = false;

  ngOnInit() {
    this.categories = this.categoriesService.all();

    this.form = this.fb.group({
      amount:       [ this.transaction.amount,      [ Validators.required ] ],
      category_id:  [ this.transaction.category_id, [ Validators.required ] ]
    });

    if (this.transaction.date) {
      this.date = this.transaction.date as string;
    }
  }
  
  ngAfterViewInit() {
    if (this.state === 'edit') {
      // this.itemCategory.nativeElement.click();
      this.selectCategory.open();
    }

    this.childrenList.changes.subscribe(childItem => {
      console.log(childItem);
    });
  }

  get amount(): AbstractControl {
    return this.form.controls.amount;
  }

  get category_id(): AbstractControl {
    return this.form.controls.category_id;
  }

  amountBlur(ev: any) {
    this._lockAmount = true;
  }

  amountFocus(ev: any) {
    this._lockAmount = false;
  }

  amountChange(ev: any) {
    if (!this._lockAmount) {
      this._originalAmount = parseFloat(ev.detail.value);
    }
    this.evAmountChange.emit(this._originalAmount);
  }

  childAmountChange(amount: number) {
    const childrenAmount = this.childrenList.reduce((sum, current) => sum + current.amount.value, 0);
    this.amount.patchValue(this._originalAmount - childrenAmount);
    this.form.updateValueAndValidity();
  }

  addChild() {
    this.children.push(new Transaction());
  }

  addChildToParent() {
    this.evAddChild.emit();
  }

  get isChild(): boolean {
    return this.parent !== null;
  }

  get isChildrenInvalid(): boolean {
    return this.childrenList.some(el => el.form.invalid);
  }

  public getFormValue(): Transaction {
    const t: Transaction = {
      // id:           this.transaction.id,
      date:         this.date || this.transaction.date,
      amount:       this.form.controls.amount.value,
      category_id:  this.form.controls.category_id.value
    };

    if (this.transaction.id) {
      t.id = this.transaction.id;
    }

    return t;
  }

  edit() {
    this.state = 'edit';
    this._originalAmount = this.transaction.amount;
    this._lockAmount = true;
  }

  cancel() {
    this.state = 'view';
    this.children = [];
    this.evCancel.emit();
  }

  async onSubmit() {
    if (this.form.valid) {
      const loading = await this.loadingCtrl.create({ message: '' });
      loading.present();

      const values: Transaction[] = [ this.getFormValue() ];

      this.childrenList.forEach(child => {
        values.push(child.getFormValue());
      });

      Promise.all([
        this.transactionsService.insert(
          values.filter(t => !t.id)
        ),
        this.transactionsService.upsert(
          values.filter(t => t.id)
        )
      ])
      .then((response: any) => {
        console.log('promise.all', response);

        const transactions = [].concat(...response);
        this.afterSave.emit(transactions);
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        loading.dismiss();
      });
    }
  }
}
