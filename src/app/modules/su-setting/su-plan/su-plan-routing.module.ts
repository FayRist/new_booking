import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuPlanComponent } from './su-plan.component';

const routes: Routes = [
  {
    path: '',
    component: SuPlanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuPlanRoutingModule { }
