import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-su-lease',
  templateUrl: './su-lease.component.html',
  styleUrls: ['./su-lease.component.scss']
})
export class SuLeaseComponent implements OnInit {

  items:any =[
    {
      id:'1',
    },
    {
      id:'2',
    },
    {
      id:'3',
    },
    {
      id:'4',
    },
    {
      id:'4',
    },
    {
      id:'4',
    },
    {
      id:'4',
    },
    {
      id:'4',
    },
    {
      id:'4',
    },
    {
      id:'4',
    },
  ];

  p: number = 1;
  tableNews: any[] = [];
  mobile: any = 10;

  constructor() { }

  ngOnInit(): void {
    if (window.screen.width <= 512) { // 768px portrait
      console.log('mobile');
      this.mobile = 5;
    }
  }

  handleEvent(event: any) {
    console.log(event);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if(window.screen.width >= 992){
      console.log('PC');
      this.mobile = 10;
    } else if(window.screen.width <= 991 && window.screen.width >= 768){
      this.mobile = 10;
      console.log('taplet');
    } else{
      console.log('mobile');
      this.mobile = 10;
    }
  }

}
