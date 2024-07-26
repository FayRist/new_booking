import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AccountingRoutingModule } from './accounting-routing.module';
// import { AccountListComponent } from './accounting.component';

import { InlineSVGModule } from 'ng-inline-svg-2';
import { AccountingRoutingModule } from '../accounting-routing.module';
import { AccountListComponent } from './account-list.component';
import { PerDayComponent } from './list/per-day/per-day.component';
import { PerMonthComponent } from './list/per-month/per-month.component';
import { PerYearComponent } from './list/per-year/per-year.component';

@NgModule({
  declarations: [
    AccountListComponent,
    PerDayComponent,
    PerMonthComponent,
    PerYearComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    AccountingRoutingModule
  ]
})
export class AccountingListModule { }
