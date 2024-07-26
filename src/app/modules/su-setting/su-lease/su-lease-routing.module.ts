import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuLeaseComponent } from './su-lease.component';

const routes: Routes = [
  {
    path: '',
    component: SuLeaseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuLeaseRoutingModule { }
