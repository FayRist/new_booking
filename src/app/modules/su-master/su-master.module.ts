import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuMasterRoutingModule } from './su-master-routing.module';
import { SuMasterComponent } from './su-master.component';
import { SuRoomComponent } from './su-room/su-room.component';
import { SuServiceComponent } from './su-service/su-service.component';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    SuMasterComponent,
    SuRoomComponent,
    SuServiceComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,

    SuMasterRoutingModule
  ]
})
export class SuMasterModule { }
