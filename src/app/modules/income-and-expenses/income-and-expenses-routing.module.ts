import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeAndExpensesComponent } from './income-and-expenses.component';

const routes: Routes = [
  {
    path: '',
    component: IncomeAndExpensesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeAndExpensesRoutingModule { }
