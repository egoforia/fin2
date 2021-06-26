import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeChartComponent } from './date-range-chart.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [DateRangeChartComponent],
  exports: [DateRangeChartComponent],
})
export class DateRangeChartModule { }
