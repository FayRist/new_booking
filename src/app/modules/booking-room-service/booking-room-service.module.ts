import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoomServiceRoutingModule } from './booking-room-service-routing.module';
import { BookingRoomServiceComponent } from './booking-room-service.component';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    BookingRoomServiceComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    BookingRoomServiceRoutingModule
  ]
})
export class BookingRoomServiceModule { }
