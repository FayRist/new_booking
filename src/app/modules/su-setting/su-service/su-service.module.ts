import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuServiceRoutingModule } from './su-service-routing.module';
import { SuServiceComponent } from './su-service.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SuServiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SuServiceRoutingModule
  ]
})
export class SuServiceModule { }
