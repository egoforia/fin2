import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/api-interfaces/transaction';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
})
export class TransactionItemComponent implements OnInit {

  constructor() { }

  @Input() transaction: Transaction;

  ngOnInit() {}

}
