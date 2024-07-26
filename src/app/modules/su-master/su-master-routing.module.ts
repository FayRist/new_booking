import { SuServiceComponent } from './su-service/su-service.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuMasterComponent } from './su-master.component';
import { SuRoomComponent } from './su-room/su-room.component';

const routes: Routes = [
  {
    path:'',
    component: SuMasterComponent,
    children:[
      {
        path:'room',
        component: SuRoomComponent,
      },
      {
        path:'service',
        component: SuServiceComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuMasterRoutingModule { }
