import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuFeeRoutingModule } from './su-fee-routing.module';
import { SuFeeComponent } from './su-fee.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SuFeeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SuFeeRoutingModule
  ]
})
export class SuFeeModule { }
