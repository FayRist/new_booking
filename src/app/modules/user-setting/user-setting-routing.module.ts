import { UserConfigComponent } from './user-config/user-config.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingComponent } from './user-setting.component';

const routes: Routes = [
  {
    path: '',
    component: UserSettingComponent,
    children: [
      // {
      //   path: 'overview',
      //   component: OverviewComponent,
      // },
      {
        path: 'settings',
        component: UserConfigComponent,
      },
      { path: '', redirectTo: 'settings', pathMatch: 'full' },
      { path: '**', redirectTo: 'settings', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSettingRoutingModule {}
