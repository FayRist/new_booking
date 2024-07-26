import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeAndExpensesRoutingModule } from './income-and-expenses-routing.module';
import { IncomeAndExpensesComponent } from './income-and-expenses.component';


@NgModule({
  declarations: [
    IncomeAndExpensesComponent
  ],
  imports: [
    CommonModule,
    IncomeAndExpensesRoutingModule
  ]
})
export class IncomeAndExpensesModule { }
