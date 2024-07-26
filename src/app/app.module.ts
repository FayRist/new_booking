import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { AngularFireModule } from '@angular/fire/compat';
import { ToastrModule } from 'ngx-toastr';
// #fake-end#

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

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    AngularFireModule.initializeApp(environment.firebase),
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,

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
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    // MatDatepickerModule,
    // MatNativeDateModule,
    // { provide: OwlDateTimeIntl, useClass: DefaultIntl },
    // { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },
    // { provide: OWL_DATE_TIME_LOCALE, useValue: 'th-TH' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
