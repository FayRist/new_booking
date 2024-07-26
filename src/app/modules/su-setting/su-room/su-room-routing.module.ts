import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuRoomComponent } from './su-room.component';

const routes: Routes = [
  {
    path: '',
    component: SuRoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuRoomRoutingModule { }
