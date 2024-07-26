import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    MemberComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,

    MemberRoutingModule
  ]
})
export class MemberModule { }
