import { UserSettingComponent } from './user-setting.component';
import { UserSettingRoutingModule } from './user-setting-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserConfigComponent } from './user-config/user-config.component';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    UserConfigComponent,
    UserSettingComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    UserSettingRoutingModule
  ]
})
export class UserSettingModule { }
