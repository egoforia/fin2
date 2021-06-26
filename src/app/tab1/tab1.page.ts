import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { Category } from '../api-interfaces/category';
import { ReportSumByCategory, Transaction } from '../api-interfaces/transaction';
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

  
  // transactions: Promise<Transaction[]>;
  
  dates: string[] = [];
  transactionsByDate: any = {};
  totalByDate: any = {};

  sumByCategories: Promise<ReportSumByCategory[]>;
  
  newTransactionDate: string = '';

  /** Charts **/
  // @ViewChild('weekChart') weekChart;
  // weekChartBars: any;

  ngOnInit() {
    for (let i = 0; i > -7; i--) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      // date.setHours(0, 0, 0, 0);

      const fDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      this.dates.push(fDate);

      this.getTransactionsByDate(fDate);
    }

    this.sumByCategories = this.transactionsService.report_sum_by_categories(this.dates[6], this.dates[0]);
  }

  getTransactionsByDate(date: string) {
    this.transactionsByDate[ date ] = this.transactionsService.getByDate(date)
      .then((transactions: Transaction[]) => {
        this.totalByDate[ date ] = transactions.reduce((sum, current) => sum + current.amount, 0)
        return transactions;
      });
  }

  addTransactionToDate(date: string) {
    this.newTransactionDate = date;
  }

  afterSaveTransactionToDate(date: string) {
    this.newTransactionDate = '';
    this.getTransactionsByDate(date);
  }

  onCancel() {
    this.newTransactionDate = '';
  }

  async presentTransactionFormModal(date: string) {
    const modal = await this.modalCtrl.create({
      component: TransactionFormModalComponent,
      cssClass: 'h-auto',
      componentProps: { date }
    });

    modal.onWillDismiss()
      .then(data => {
        // this.getAllTransactions();
        this.getTransactionsByDate(date);
      })

    modal.present();
  }

  /** Charts **/
  createWeekChart() {
    // const labels = this.transactionsByDate
    //   .map(date => {
    //     date.forEach()
    //   });

    // this.weekChartBars = new Chart(this.weekChart.nativeElement, {
    //   type: 'bar',
    //   data: {
    //     labels,
    //     datasets: [{

    //     }]
    //   }
    // })
  }
}
