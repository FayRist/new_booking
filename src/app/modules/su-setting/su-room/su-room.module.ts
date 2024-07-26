import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuRoomRoutingModule } from './su-room-routing.module';
import { SuRoomComponent } from './su-room.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SuRoomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SuRoomRoutingModule
  ]
})
export class SuRoomModule { }
