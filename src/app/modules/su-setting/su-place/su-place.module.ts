import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuPlaceRoutingModule } from './su-place-routing.module';
import { SuPlaceComponent } from './su-place.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SuPlaceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuPlaceRoutingModule
  ]
})
export class SuPlaceModule { }
