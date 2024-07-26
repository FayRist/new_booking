import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoomRoutingModule } from './calendar-room-routing.module';
import { CalendarRoomComponent } from './calendar-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DayPilotModule } from 'daypilot-pro-angular';
import { DataService } from './service/data.service';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { SchedulerModule } from './scheduler/scheduler.module';


// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
// import { MAT_DATE_LOCALE } from '@angular/material/core';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatSelectModule } from '@angular/material/select';
// import { MatCardModule } from '@angular/material/card';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatTableModule } from '@angular/material/table';
// import { MatListModule } from '@angular/material/list';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { MatTreeModule } from '@angular/material/tree';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatSortModule } from '@angular/material/sort';
// import { MatIconModule } from '@angular/material/icon';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { AngularFireModule } from '@angular/fire/compat';
// import {
//   OwlDateTimeModule,
//   OwlNativeDateTimeModule,
//   OWL_DATE_TIME_LOCALE,
//   OwlDateTimeIntl,
// } from '@danielmoncada/angular-datetime-picker';
// import {
//   MatBottomSheetModule,
//   MatBottomSheetRef,
//   MAT_BOTTOM_SHEET_DATA,
// } from '@angular/material/bottom-sheet';
// export class DefaultIntl extends OwlDateTimeIntl {
//   public cancelBtnLabel = 'ยกเลิก';
//   public setBtnLabel = 'เลือก';
// }


@NgModule({
  declarations: [CalendarRoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    SchedulerModule,
    ReactiveFormsModule,
    HttpClientModule,
    // SidebarModule,
    DayPilotModule,
    CalendarRoomRoutingModule,


    // MatInputModule,
    // MatAutocompleteModule,
    // MatListModule,
    // MatSliderModule,
    // MatCardModule,
    // MatSelectModule,
    // MatMenuModule,
    // MatTabsModule,
    // MatTooltipModule,
    // MatSidenavModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatSnackBarModule,
    // MatTableModule,
    // MatGridListModule,
    // MatToolbarModule,
    // MatBottomSheetModule,
    // MatSortModule,
    // MatStepperModule,
    // MatChipsModule,
    // MatPaginatorModule,
    // MatTreeModule,
    // MatButtonToggleModule,
    // MatIconModule,
    // MatDatepickerModule,
    // MatNativeDateModule,

  ],
  providers: [
    DataService,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // { provide: OwlDateTimeIntl, useClass: DefaultIntl },
    // { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
    // { provide: OWL_DATE_TIME_LOCALE, useValue: 'th-TH' },
  ],
})
export class CalendarRoomModule {}
