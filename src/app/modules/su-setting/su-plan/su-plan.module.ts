import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuPlanRoutingModule } from './su-plan-routing.module';
import { SuPlanComponent } from './su-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SuPlanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuPlanRoutingModule
  ]
})
export class SuPlanModule { }
