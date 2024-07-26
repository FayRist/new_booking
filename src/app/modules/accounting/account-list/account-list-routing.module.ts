import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from '../account-detail/account-detail.component';
import { AccountListComponent } from './account-list.component';
import { PerDayComponent } from './list/per-day/per-day.component';
import { PerMonthComponent } from './list/per-month/per-month.component';
import { PerYearComponent } from './list/per-year/per-year.component';
const routes: Routes = [
  {
    path: '',
    component: AccountListComponent,
    children: [
      {
        path: 'day',
        component: PerDayComponent,
      },
      {
        path: 'month',
        component: PerMonthComponent,
      },
      {
        path: 'year',
        component: PerYearComponent,
      },
      { path: '', redirectTo: 'day', pathMatch: 'full' },
      { path: '**', redirectTo: 'day', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountListRoutingModule {}
