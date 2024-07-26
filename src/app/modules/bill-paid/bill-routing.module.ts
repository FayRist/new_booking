import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillPaidComponent } from './bill-paid.component';

const routes: Routes = [
  {
    path: '',
    component: BillPaidComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillPaidRoutingModule {}
