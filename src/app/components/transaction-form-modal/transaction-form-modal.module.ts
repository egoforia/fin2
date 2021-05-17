import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionFormModalComponent } from './transaction-form-modal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TransactionFormModalComponent],
  exports: [TransactionFormModalComponent],
})
export class TransactionFormModalModule { }
