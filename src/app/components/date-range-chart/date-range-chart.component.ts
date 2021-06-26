import { Component, Input, OnInit } from '@angular/core';
import { ReportAvgSum } from 'src/app/api-interfaces/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';
import { DateUtil } from 'src/app/utils/date-util';

@Component({
  selector: 'app-date-range-chart',
  templateUrl: './date-range-chart.component.html',
  styleUrls: ['./date-range-chart.component.scss'],
})
export class DateRangeChartComponent implements OnInit {

  constructor(
    private transactionsService: TransactionsService
  ) { }

  @Input() range: 'last7days' | 'last30days';

  currentAvg: number;
  currentTotal: number;
  lastAvg: number;
  lastTotal: number;

  diffAvg: number;
  diffPercentageAvg: number;
  diffTotal: number;
  diffPergentageTotal: number;

  currentStartDate: string;
  currentEndDate: string;
  lastStartDate: string;
  lastEndDate: string;

  ngOnInit() {
    const now = new Date();
    this.currentEndDate = DateUtil.apiFormat(now);

    switch(this.range) {
      case 'last7days':
        now.setDate(now.getDate() - 6);
        this.currentStartDate =  DateUtil.apiFormat(now);
        now.setDate(now.getDate() - 1);
        this.lastEndDate = DateUtil.apiFormat(now);
        now.setDate(now.getDate() - 6);
        this.lastStartDate = DateUtil.apiFormat(now);
        break;
      case 'last30days':
        now.setDate(now.getDate() - 30);
        this.currentStartDate =  DateUtil.apiFormat(now);
        now.setDate(now.getDate() - 1);
        this.lastEndDate = DateUtil.apiFormat(now);
        now.setDate(now.getDate() - 30);
        this.lastStartDate = DateUtil.apiFormat(now);
        break;
    }

    this.getAvgTotal();
  }

  getAvgTotal() {
    Promise.all([
      this.transactionsService.report_avg_sum(this.currentStartDate, this.currentEndDate)
        .then((avgTotal: ReportAvgSum) => {
          this.currentAvg = avgTotal.average;
          this.currentTotal = avgTotal.total;
          return avgTotal;
        }),
      this.transactionsService.report_avg_sum(this.lastStartDate, this.lastEndDate)
        .then((avgTotal: ReportAvgSum) => {
          this.lastAvg = avgTotal.average;
          this.lastTotal = avgTotal.total;
          return avgTotal;
        })
    ])
    .then((values: ReportAvgSum[]) => {
      this.diffAvg = this.currentAvg - this.lastAvg;
      this.diffPercentageAvg = (100 * (this.diffAvg / this.currentAvg)) - 100;
      this.diffTotal = this.currentTotal - this.lastTotal;
    })

    
  }
}
