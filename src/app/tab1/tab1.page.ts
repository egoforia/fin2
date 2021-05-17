import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from '../api-interfaces/category';
import { Transaction } from '../api-interfaces/transaction';
import { TransactionFormModalComponent } from '../components/transaction-form-modal/transaction-form-modal.component';
import { CategoriesService } from '../services/categories.service';
import { TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(
    private transactionsService: TransactionsService,
    private modalCtrl: ModalController
  ) {}

  transactions: Promise<Transaction[]>;

  ngOnInit() {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactions = this.transactionsService.all();
  }

  async presentTransactionFormModal() {
    const modal = await this.modalCtrl.create({
      component: TransactionFormModalComponent,
      cssClass: '',
      componentProps: {}
    });

    modal.onWillDismiss()
      .then(data => {
        this.getAllTransactions();
      })

    modal.present();
  }

}
