import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { Category } from 'src/app/api-interfaces/category';
import { Transaction } from 'src/app/api-interfaces/transaction';
import { CategoriesService } from 'src/app/services/categories.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transaction-form-modal',
  templateUrl: './transaction-form-modal.component.html',
  styleUrls: ['./transaction-form-modal.component.scss'],
})
export class TransactionFormModalComponent implements OnInit {

  constructor(
    private categoriesService: CategoriesService,
    private transactionsService: TransactionsService,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) { }

  form: FormGroup;

  categories: Promise<Category[]>;

  ngOnInit() {
    this.categories = this.categoriesService.all();

    this.form = this.fb.group({
      amount:       [ null, [ Validators.required ] ],
      date:         [ null, [ Validators.required ] ],
      category_id:  [ null, [ Validators.required ] ]
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      const loading = await this.loadingCtrl.create({ message: '' });
      loading.present();

      const transaction: Transaction = {
        amount: this.form.controls.amount.value,
        date: this.form.controls.date.value,
        category_id: this.form.controls.category_id.value
      };

      this.transactionsService.insert([ transaction ])
        .then((transactions: Transaction[]) => {
          this.modalCtrl.dismiss({
            transactions
          })
        })
        .catch(e => {

        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }

}
