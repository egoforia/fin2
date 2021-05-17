import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { TransactionFormModalModule } from '../components/transaction-form-modal/transaction-form-modal.module';
import { TransactionItemModule } from '../components/transaction-item/transaction-item.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    TransactionFormModalModule,
    TransactionItemModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
