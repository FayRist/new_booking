import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuLeaseRoutingModule } from './su-lease-routing.module';
import { SuLeaseComponent } from './su-lease.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    SuLeaseComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    SuLeaseRoutingModule
  ]
})
export class SuLeaseModule { }
