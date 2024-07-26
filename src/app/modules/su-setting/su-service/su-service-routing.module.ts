import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuServiceComponent } from './su-service.component';

const routes: Routes = [
  {
    path: '',
    component: SuServiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuServiceRoutingModule { }
