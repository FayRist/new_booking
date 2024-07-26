import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuSettingComponent } from './su-setting.component';

const routes: Routes = [
  {
    path: '',
    component: SuSettingComponent,
    children: [
      {
        path: 'place',
        loadChildren: () =>
          import('../su-setting/su-place/su-place.module').then(
            (m) => m.SuPlaceModule
          ),
      },
      {
        path: 'bill',
        loadChildren: () =>
          import('../su-setting/su-bill/su-bill.module').then(
            (m) => m.SuBillModule
          ),
      },
      {
        path: 'lease',
        loadChildren: () =>
          import('../su-setting/su-lease/su-lease.module').then(
            (m) => m.SuLeaseModule
          ),
      },
      {
        path: 'plan',
        loadChildren: () =>
          import('../su-setting/su-plan/su-plan.module').then(
            (m) => m.SuPlanModule
          ),
      },
      {
        path: 'water-electric',
        loadChildren: () =>
          import(
            '../su-setting/su-water-electric/su-water-electric.module'
          ).then((m) => m.SuWaterElectricModule),
      },
      {
        path: 'room',
        loadChildren: () =>
          import('../su-setting/su-room/su-room.module').then(
            (m) => m.SuRoomModule
          ),
      },
      {
        path: 'service',
        loadChildren: () =>
          import('../su-setting/su-service/su-service.module').then(
            (m) => m.SuServiceModule
          ),
      },
      {
        path: 'fee',
        loadChildren: () =>
          import('../su-setting/su-fee/su-fee.module').then(
            (m) => m.SuFeeModule
          ),
      },
      {
        path: 'asset',
        loadChildren: () =>
          import('../su-setting/su-asset/su-asset.module').then(
            (m) => m.SuAssetModule
          ),
      },
      {
        path: 'horganice',
        loadChildren: () =>
          import('../su-setting/su-horganice/su-horganice.module').then(
            (m) => m.SuHorganiceModule
          ),
      },
      {
        path: 'bank',
        loadChildren: () =>
          import('../su-setting/su-bank/su-bank.module').then(
            (m) => m.SuBankModule
          ),
      },
      // { path: '', redirectTo: '/setting/place' },
      // { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuSettingRoutingModule {}
