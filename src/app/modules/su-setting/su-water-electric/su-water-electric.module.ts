import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuWaterElectricRoutingModule } from './su-water-electric-routing.module';
import { SuWaterElectricComponent } from './su-water-electric.component';


@NgModule({
  declarations: [
    SuWaterElectricComponent
  ],
  imports: [
    CommonModule,
    SuWaterElectricRoutingModule
  ]
})
export class SuWaterElectricModule { }
