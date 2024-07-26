import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuPlaceComponent } from './su-place.component';

const routes: Routes = [
  {
    path: '',
    component: SuPlaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuPlaceRoutingModule { }
