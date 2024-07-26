import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { PerDayComponent } from './account-list/list/per-day/per-day.component';
import { PerMonthComponent } from './account-list/list/per-month/per-month.component';
import { PerYearComponent } from './account-list/list/per-year/per-year.component';
import { AccountingComponent } from './accounting.component';

const routes: Routes = [
  {
    path: '',
    component: AccountingComponent,
    children: [
      {
        path: 'main',
        loadChildren: () =>
          import('../accounting/account-list/account-list.module').then(
            (m) => m.AccountingListModule
          ),
      },
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
      {
        path: 'detail',
        component: AccountDetailComponent,
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
export class AccountingRoutingModule {}
