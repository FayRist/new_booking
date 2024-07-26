import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuSettingRoutingModule } from './su-setting-routing.module';
import { SuSettingComponent } from './su-setting.component';


@NgModule({
  declarations: [
    SuSettingComponent
  ],
  imports: [
    CommonModule,
    SuSettingRoutingModule
  ]
})
export class SuSettingModule { }
