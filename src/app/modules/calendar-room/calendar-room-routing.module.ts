import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarRoomComponent } from './calendar-room.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarRoomComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoomRoutingModule { }
