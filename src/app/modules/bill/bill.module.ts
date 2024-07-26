import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BillRoutingModule } from './bill-routing.module';
import { BillComponent } from './bill.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThaiDatePipe } from './thaidate.pipe';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeIntl,
} from '@danielmoncada/angular-datetime-picker';
export class DefaultIntl extends OwlDateTimeIntl {
  public cancelBtnLabel = 'ยกเลิก';
  public setBtnLabel = 'เลือก';
}

@NgModule({
  declarations: [BillComponent, ThaiDatePipe],
  imports: [
    MatDatepickerModule,
    CommonModule,
    BillRoutingModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    MatDatepickerModule,
    { provide: OwlDateTimeIntl, useClass: DefaultIntl },
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'th-TH' },
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
  ],
})
export class BillModule { }
