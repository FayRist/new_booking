import { filter } from 'rxjs/operators';
// import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  DayPilot,
  DayPilotNavigatorComponent,
  DayPilotSchedulerComponent,
} from 'daypilot-pro-angular';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  @ViewChild('scheduler') scheduler!: DayPilotSchedulerComponent;
  @ViewChild('navigator') navigator!: DayPilotNavigatorComponent;
  // @ViewChild('picker2') picker2: any;

  booking_room = new FormGroup({
    bookingFirstName: new FormControl(''),
    bookingLastName: new FormControl(''),
    bookingIdRoom: new FormControl(''),
    bookingRoom: new FormControl(''),
    bookingAmountPeple: new FormControl(''),
    bookingService: new FormControl(''),
    bookingCheckIn: new FormControl(new Date()),
    bookingCheckOut: new FormControl(new Date()),
    bookingCountDay: new FormControl(0),
    bookingPrice: new FormControl(''),
    bookingDeposit: new FormControl(''),
    bookingSeq: new FormControl(0),
  });

  listService: any = [];

  events: DayPilot.EventData[] = [];

  expanded: boolean = true;
  items: any = [];
  check: boolean = false;
  checkroom: boolean = false;
  openService: boolean = false;
  openServiceValue: any = 0;
  itemsF: any = [];
  listRoom: any = [];
  listSevice: any = [];
  listFood: any = [];

  listSeviceAdd: any = [];

  priceType: any = 'pd';

  Today: any = new Date();

  idBooking: any = null;

  // setDayPilot: any = '2022-12-01';
  setDayPilot: any = new Date();

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private ds: DataService,
    private cdr: ChangeDetectorRef,
    // public datepipe: DatePipe,
    public appRef: ChangeDetectorRef
  ) {
    var month = this.Today.getUTCMonth() + 1; //months from 1-12
    var year = this.Today.getUTCFullYear();
    var day = this.Today.getUTCDate();
    if (day >= 1 && day <= 15) {
      this.setDayPilot = year + '-01' + '-' + month;
    } else if (day >= 16 && day <= 31) {
      this.setDayPilot = year + '-16' + '-' + month;
    }
  }

  ngOnInit() {
    this.selectRoom();
    this.selectService();

    // console.log(this.config);

    // this.getAllasset();
    // let day = new Date();
    // let latest_date = this.datepipe.transform(day, 'yyyy-MM-dd');
    // // console.log(latest_date);
    // // console.log(day);
    // ;
  }

  selectService() {
    this.listSevice = [];
    this.listFood = [];
    this.ds.getSelectService().subscribe((item: any) => {
      this.listSevice = item;
      this.appRef.detectChanges();
    });
    this.ds.getSelectFood().subscribe((food: any) => {
      this.listFood = food;
      this.appRef.detectChanges();
    });
  }

  openBookingRoom(contentBookingRoom: any) {
    this.listService = [];
    this.openService = false;
    this.booking_room.reset();
    this.selectRoom();
    this.modalService.open(contentBookingRoom, {
      backdropClass: 'light-blue-backdrop',
      size: 'md',
    });
  }
  navigatorDate: DayPilot.Date = new DayPilot.Date(this.setDayPilot);

  navigatorConfig: DayPilot.NavigatorConfig = {
    showMonths: 2,
    skipMonths: 2,
    selectMode: 'Month',
    cellHeight: 30,
    cellWidth: 30,
    dayHeaderHeight: 30,
    titleHeight: 30,
  };

  config: DayPilot.SchedulerConfig = {
    timeHeaders: [
      { groupBy: 'Month', format: 'MMMM yyyy' },
      { groupBy: 'Day', format: 'd' },
    ],
    eventHeight: 40,
    headerHeight: 30,
    scale: 'Day',
    days: 31,
    startDate: this.setDayPilot,
    // startDate: '2023-11-01',
    treeEnabled: true,
    heightSpec: 'Max100Pct',
    hideBorderFor100PctHeight: true,
  };

  ngAfterViewInit(): void {
    this.ds
      .getResources()
      .subscribe((result: any) => (this.config.resources = result));
  }

  viewChange() {
    const from = this.scheduler.control.visibleStart();
    const to = this.scheduler.control.visibleEnd();
    this.ds.getEvents(from, to).subscribe((result: any) => {
      this.events = result;
      this.appRef.detectChanges();
    });
  }

  dateChange() {
    // console.log(this.setDayPilot);
    this.config.startDate = this.navigator.control.selectionStart;
    this.config.days =
      new DayPilot.Duration(
        <DayPilot.Date>this.navigator.control.selectionStart,
        <DayPilot.Date>this.navigator.control.selectionEnd
      ).totalDays() + 1;
  }

  changeAutoCellWidth(event: Event) {
    const target = <HTMLInputElement>event.target;
    if (target.checked) {
      this.config.cellWidthSpec = 'Auto';
    } else {
      this.config.cellWidthSpec = 'Fixed';
      this.config.cellWidth = 40;
    }
  }

  addBooking() {
    // this.addServiceInRoom(this.listService, 'Fgtk33xyQLfdlsFj7SZO')

    let id = this.booking_room.controls.bookingIdRoom.value;
    let seq = Math.floor(Math.random() * Math.floor(20000));
    let list = this.listRoom.filter((i: any) => i.idr == id);
    var priceRoom = 0;
    let sDay = this.booking_room.controls.bookingCheckIn.value || new Date();
    let eDay = this.booking_room.controls.bookingCheckOut.value || new Date();
    let perDay = this.getDayDiff(eDay, sDay);
    ;
    if (this.priceType == 'pd') {
      list[0].pricePerDay;
      this.booking_room.controls.bookingPrice.setValue(list[0].pricePerDay);
    } else if (this.priceType == 'hd') {
      list[0].pricePerHoilday;
      this.booking_room.controls.bookingPrice.setValue(list[0].pricePerHoilday);
    }
    this.booking_room.controls.bookingCountDay.setValue(perDay);
    this.booking_room.controls.bookingDeposit.setValue(list[0].priceDeposit);
    this.booking_room.controls.bookingRoom.setValue(list[0].roomName);
    this.booking_room.controls.bookingSeq.setValue(seq);

    this.ds
      .saveBooking(this.booking_room.getRawValue())
      .then((x: any) => {
        console.log(x);
        ;
        this.toastr.success('จองห้องสำเร็จเรียบร้อย');
        this.addServiceInRoom(this.listService, x);
        this.modalService.dismissAll();
      })
      .catch((error: any) => {
        // this.showError();
        this.toastr.error('จองห้องไม่สำเร็จเรียบร้อย');
        console.error('Error adding document: ', error);
      });
  }

  getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;

    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
  }

  addServiceInRoom(data: any, idDoc: any) {
    ;
    data.forEach((element: any) => {
      this.ds
        .addServiceInBooking(element, idDoc)
        .then((x: any) => {
          this.toastr.success('จองบริการสำเร็จเรียบร้อย');
        })
        .catch((error: any) => {
          // this.showError();
          this.toastr.error('จองบริการไม่สำเร็จเรียบร้อย');
          console.error('Error adding document: ', error);
        });
    });
  }

  // -------------room-------------------------------------

  selectRoom() {
    this.ds.getFloorData().subscribe((floor: any) => {
      ;
      this.listRoom = [];
      // if (!this.check) {
      //   this.check = true;
      for (let index = 0; index < floor.length; index++) {
        let listRoomArray: any = [];
        const element = floor[index].data;
        this.ds.getRoomData(element.id).subscribe((room: any) => {
          room.forEach((dataroom: any) => {
            this.listRoom.push({
              idr: dataroom.id,
              roomName: dataroom.data.roomName,
              priceDeposit: dataroom.data.priceDeposit,
              pricePerDay: dataroom.data.pricePerDay,
              pricePerHoilday: dataroom.data.pricePerHoilday,
            });
          });
        });
        // this.listRoom.push({
        //   floorName: element.floorName,
        //   listRoom: listRoomArray,
        // });
      }
      // }
      // console.log(this.listRoom);
    });
  }

  // --------------------------------------------------

  clickBooking(events: any, event: any, contentAddServiceInRoom: any) {
    let textFilter = event.target.innerText;
    console.log(events);
    ;
    let idRef = textFilter.substring(
      textFilter.indexOf('[ รหัสอ้างอิง: ') + 15,
      textFilter.lastIndexOf(']')
    );
    console.log(idRef);
    ;
    // let data = events.filter((i: any) => i.id == events[0].id);
    let data = events.filter((i: any) => i.id == idRef);
    ;
    console.log(data[0]);

    this.openAddServiceInRoom(contentAddServiceInRoom, textFilter, data[0]);
  }

  // changeValue(event: any, contentAddServiceInRoom: any) {
  //   // console.log(event.target.value);
  //   if (event.target.value == '1') {
  //     this.openService = true;
  //     this.openAddServiceInRoom(contentAddServiceInRoom);
  //   } else if (event.target.value == '0') {
  //     this.openService = false;
  //   }
  // }

  openAddServiceInRoom(contentAddServiceInRoom: any, text: any, data: any) {
    ;
    this.openService = false;
    this.listService = [];

    this.idBooking = null;

    if (text !== 'none') {
      this.idBooking = data.id;
      this.ds.getServiceInRoom(data.id).subscribe((x: any) => {
        ;
        this.listService = x;
      });
    }
    this.modalService.open(contentAddServiceInRoom, {
      backdropClass: 'light-blue-backdrop',
      size: 'xl',
    });
  }

  showSuccess() {
    this.toastr.success('บันทึกข้อมูลเรียบร้อย');
  }

  showError() {
    this.toastr.error('บันทึกข้อมูลล้มเหลว');
  }

  // ----------------------------------------------------------

  addService() {
    let seq = Math.floor(Math.random() * Math.floor(20000));
    let service = {
      id: '',
      seq: seq,
      serviceName: '',
      servicePrice: '',
      serviceAmount: '',
      serviceType: 'service',
    };

    this.listService.push(service);

    if (this.idBooking !== null) {
      this.listSeviceAdd.push(service);
    }
    // this.toastr.success('จองเรียบร้อย');

    console.log(this.listService);
    console.log(this.listSeviceAdd);
  }

  addFood() {
    let seq = Math.floor(Math.random() * Math.floor(20000));
    let service = {
      id: '',
      seq: seq,
      serviceName: '',
      servicePrice: '',
      serviceAmount: '',
      serviceType: 'food',
    };

    this.listService.push(service);

    if (this.idBooking !== null) {
      this.listSeviceAdd.push(service);
    }
    // this.toastr.success('จองเรียบร้อย');

    console.log(this.listService);
    console.log(this.listSeviceAdd);
  }

  saveService() {
    ;
    if (this.idBooking !== null && this.listSeviceAdd.length !== 0) {
      this.listSeviceAdd.forEach((element: any) => {
        ;
        this.ds
          .addServiceInBooking(element, this.idBooking)
          .then((x: any) => {
            this.listSeviceAdd = [];
            this.toastr.success('จองบริการสำเร็จเรียบร้อย');
          })
          .catch((error: any) => {
            // this.showError();
            this.toastr.error('จองบริการไม่สำเร็จเรียบร้อย');
            console.error('Error adding document: ', error);
          });
      });
    }

    if (this.listService.length !== 0) {
      this.listService.forEach((element: any) => {
        this.ds
          .updateServiceInRoom(element, this.idBooking)
          .then((x: any) => {
            this.listSeviceAdd = [];
            // this.toastr.success('ปรับแก้บริการสำเร็จเรียบร้อย');
          })
          .catch((error: any) => {
            // this.showError();
            this.toastr.error('ปรับแก้บริการไม่สำเร็จเรียบร้อย');
            console.error('Error adding document: ', error);
          });
      });
      this.toastr.success('ปรับแก้บริการสำเร็จเรียบร้อย');
    }

    // let seq = Math.floor(Math.random() * Math.floor(20000));
    // let service = {
    //   id: '',
    //   seq: seq,
    //   serviceName: '',
    //   servicePrice: '',
    //   serviceAmount: '',
    // };
    // this.listService.push(service);
    // this.toastr.success('จองเรียบร้อย');

    console.log(this.listService);
  }

  removeService(id: any, seq: any) {
    ;
    console.log(this.listService);
    console.log(this.idBooking);
    if (this.idBooking === null) {
      this.listService = this.listService.filter((a: any) => a.seq !== seq);
    } else {
      this.listService = this.listService.filter((a: any) => a.seq !== seq);
      this.ds.deleteServiceInRoom(this.idBooking, id).then((x: any) => {
        this.toastr.success('ยกเลิกบริการเรียบร้อย');
      });
    }

    // for (let index = 0; index < inroom.length; index++) {
    //   const element = inroom;
    //   inroom = element.filter((x: any) => x.seq !== seq);
    // }
  }

  changePrice(value: any) {
    ;
    if (value == 'pd') {
      this.priceType.setValue('pd');
    } else if (value == 'hd') {
      this.priceType.setValue('hd');
    }
  }

  cancelBooking(cancelBooking: any) {
    debugger;
    this.modalService.open(cancelBooking, {
      backdropClass: 'light-blue-backdrop',
      size: 'md',
    });
  }

  cancel() {
    this.ds.deleteBooking(this.idBooking).then((x: any) => {
      this.modalService.dismissAll();
      this.toastr.success('ยกเลิกการจองห้องเรียบร้อย');
    });
  }
}
