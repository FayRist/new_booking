import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillPaidRoutingModule } from './bill-routing.module';
import { BillPaidComponent } from './bill-paid.component';

@NgModule({
  declarations: [BillPaidComponent],
  imports: [CommonModule, BillPaidRoutingModule],
})
export class BillPaidModule {}
