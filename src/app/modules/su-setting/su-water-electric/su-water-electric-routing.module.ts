import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuWaterElectricComponent } from './su-water-electric.component';

const routes: Routes = [
  {
    path: '',
    component: SuWaterElectricComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuWaterElectricRoutingModule { }
