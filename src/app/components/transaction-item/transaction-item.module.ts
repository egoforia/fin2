import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionItemComponent } from './transaction-item.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TransactionItemComponent],
  exports: [TransactionItemComponent],
})
export class TransactionItemModule { }
