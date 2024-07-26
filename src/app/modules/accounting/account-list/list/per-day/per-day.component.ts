import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-per-day',
  templateUrl: './per-day.component.html',
  styleUrls: ['./per-day.component.scss']
})
export class PerDayComponent implements OnInit {

  dataList:any = [
    {
      id: '1',
      accountType: 'income',
      remark: 'Ex. ค่าซ้อมบำรุง',
      note: 'Ex. รายรับ',
      amount: 1500,
    },
    {
      id: '2',
      accountType: 'expenses',
      remark: 'Ex. ค่าซ้อมบำรุง',
      note: 'Ex. รายจ่าย',
      amount: 1700,
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
