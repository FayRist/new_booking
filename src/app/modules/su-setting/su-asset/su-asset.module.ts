import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuAssetRoutingModule } from './su-asset-routing.module';
import { SuAssetComponent } from './su-asset.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SuAssetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SuAssetRoutingModule
  ]
})
export class SuAssetModule { }
