import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeDetailComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,

    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
