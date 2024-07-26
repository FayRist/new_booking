import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuFeeComponent } from './su-fee.component';
import { SuFeeModule } from './su-fee.module';

const routes: Routes = [
  {
    path: '',
    component: SuFeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuFeeRoutingModule { }
