import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuBankComponent } from './su-bank.component';

const routes: Routes = [
  {
    path: '',
    component: SuBankComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuBankRoutingModule { }
