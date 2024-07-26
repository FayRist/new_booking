import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-per-month',
  templateUrl: './per-month.component.html',
  styleUrls: ['./per-month.component.scss']
})
export class PerMonthComponent implements OnInit {
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
