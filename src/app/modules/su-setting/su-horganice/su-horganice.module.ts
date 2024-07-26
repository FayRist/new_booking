import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuHorganiceRoutingModule } from './su-horganice-routing.module';
import { SuHorganiceComponent } from './su-horganice.component';


@NgModule({
  declarations: [
    SuHorganiceComponent
  ],
  imports: [
    CommonModule,
    SuHorganiceRoutingModule
  ]
})
export class SuHorganiceModule { }
