import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuBankRoutingModule } from './su-bank-routing.module';
import { SuBankComponent } from './su-bank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    SuBankComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SuBankRoutingModule
  ]
})
export class SuBankModule { }
