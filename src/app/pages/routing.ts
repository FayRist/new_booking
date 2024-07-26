import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
    data: { layout: 'dark-header' },
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
    data: { layout: 'light-header' },
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
    data: { layout: 'light-header' },
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'booking',
    loadChildren: () =>
      import(
        '../modules/booking-room-service/booking-room-service.module'
      ).then((m) => m.BookingRoomServiceModule),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'accounting',
    loadChildren: () =>
      import('../modules/accounting/accounting.module').then(
        (m) => m.AccountingModule
      ),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'member',
    loadChildren: () =>
      import('../modules/member/member.module').then((m) => m.MemberModule),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('../modules/employee/employee.module').then(
        (m) => m.EmployeeModule
      ),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'su-master',
    loadChildren: () =>
      import('../modules/su-master/su-master.module').then(
        (m) => m.SuMasterModule
      ),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'user-setting',
    loadChildren: () =>
      import('../modules/user-setting/user-setting.module').then(
        (m) => m.UserSettingModule
      ),
    data: { layout: 'light-sidebar' },
  },

  // {
  //   path: 'calendar',
  //   loadChildren: () =>
  //     import('../modules/calendar/calendar.module').then((m) => m.CalendarModule),
  //   data: { layout: 'light-sidebar' },
  // },

  {
    path: 'calendar-room',
    loadChildren: () =>
      import('../modules/calendar-room/calendar-room.module').then(
        (m) => m.CalendarRoomModule
      ),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'income-and-expenses',
    loadChildren: () =>
      import('../modules/income-and-expenses/income-and-expenses.module').then(
        (m) => m.IncomeAndExpensesModule
      ),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'bill',
    loadChildren: () =>
      import('../modules/bill/bill.module').then((m) => m.BillModule),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'bill-paid',
    loadChildren: () =>
      import('../modules/bill-paid/bill-paid.module').then((m) => m.BillPaidModule),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'account',
    loadChildren: () =>
      import('../modules/acc/acc.module').then((m) => m.AccModule),
    data: { layout: 'light-sidebar' },
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('../modules/su-setting/su-setting.module').then(
        (m) => m.SuSettingModule
      ),
    data: { layout: 'light-sidebar' },
  },

  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
