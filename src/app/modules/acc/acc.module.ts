import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccRoutingModule } from './acc-routing.module';
import { AccComponent } from './acc.component';


@NgModule({
  declarations: [
    AccComponent
  ],
  imports: [
    CommonModule,
    AccRoutingModule
  ]
})
export class AccModule { }
