import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AccountingComponent } from './accounting.component';

import { InlineSVGModule } from 'ng-inline-svg-2';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { PerDayComponent } from './account-list/list/per-day/per-day.component';
import { PerMonthComponent } from './account-list/list/per-month/per-month.component';
import { PerYearComponent } from './account-list/list/per-year/per-year.component';

@NgModule({
  declarations: [
    AccountingComponent,
    // AccountListComponent,
    AccountDetailComponent,

  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    AccountingRoutingModule
  ]
})
export class AccountingModule { }
