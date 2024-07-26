import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuHorganiceComponent } from './su-horganice.component';
import { SuHorganiceModule } from './su-horganice.module';

const routes: Routes = [
  {
    path: '',
    component: SuHorganiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuHorganiceRoutingModule { }
