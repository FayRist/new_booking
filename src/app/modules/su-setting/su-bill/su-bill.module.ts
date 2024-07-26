import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuBillRoutingModule } from './su-bill-routing.module';
import { SuBillComponent } from './su-bill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SuBillComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuBillRoutingModule
  ]
})
export class SuBillModule { }
