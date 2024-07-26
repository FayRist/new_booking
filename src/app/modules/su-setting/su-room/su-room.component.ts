import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SuRoomService } from './service/su-room.service';

@Component({
  selector: 'app-su-room',
  templateUrl: './su-room.component.html',
  styleUrls: ['./su-room.component.scss'],
})
export class SuRoomComponent implements OnInit {
  items: any = [];
  check: boolean = false;
  checkroom: boolean = false;
  itemsF: any = [];

  priceFrom = new FormGroup({
    pricePerDay: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    pricePerHoilday: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    priceDeposit: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
  });

  settingroom: any = 0;

  p: number = 1;
  tableNews: any[] = [];
  mobile: any = 15;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private sv: SuRoomService,
    private toastr: ToastrService,
    public appRef: ChangeDetectorRef,
    private modalService: NgbModal
  ) {
    this.masterSelected = false;
  }

  clickRoom(idf: any, idr: any) {
    let round: any = false;
    let floor = this.checkedList.filter((a: any) => a.id == idf);
    for (let index = 0; index < floor[0].listRoom.length; index++) {
      const element = floor[0].listRoom;
      let roomTrue = element.filter((x: any) => x.idr == idr);
      roomTrue.forEach((x: any) => {
        if (x.isSelected === true && round === false) {
          x.isSelected = false;
          round = true;
          this.settingroom = this.settingroom - 1;
          // this.removeSetting(idf, idr);
        } else if (x.isSelected === false && round === false) {
          x.isSelected = true;
          this.settingroom++;
          round = true;
        }
      });
    }
    // console.log(this.checkedList);
  }

  checkUncheckAll() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList1();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.items.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList1();
  }
  ngOnInit(): void {
    this.getListFloor();
    if (window.screen.width <= 512) {
      // 768px portrait
      // console.log('mobile');
      this.mobile = 15;
    }
  }

  getListFloor() {
    this.sv.getFloorData().subscribe((floor: any) => {
      this.itemsF = [];
      if (!this.check) {
        this.check = true;
        for (let index = 0; index < floor.length; index++) {
          let listRoomArray: any = [];
          const element = floor[index].data;
          this.sv.getRoomData(element.id).subscribe((room: any) => {
            room.forEach((element: any) => {

              listRoomArray.push(element.data);
              this.appRef.detectChanges();
            });
            this.getCheckedItemList1();
          });
          this.itemsF.push({
            id: element.id,
            seqF: element.seqF,
            floorName: element.floorName,
            listRoom: listRoomArray,
          });
        }
      }
      console.log(this.itemsF);
    });
  }

  // getListRoom(id: any, seqF: any) {
  //   let listRoomArray: any = [];
  //   this.sv.getRoomData(id).subscribe((room: any) => {
  //     if (!this.checkroom) {
  //       this.checkroom = true;
  //       room.forEach((x: any) => {
  //
  //         listRoomArray.push({
  //           idr: x.data.idr,
  //           priceDeposit: x.data.priceDeposit,
  //           pricePerDay: x.data.pricePerDay,
  //           ricePerHoilday: x.data.ricePerHoilday,
  //           roomName: x.data.roomName,
  //           roomPeople: x.data.roomPeople,
  //           roomSubBed: x.data.roomSubBed,
  //           roomType: x.data.roomType,
  //           roomView: x.data.roomView,
  //           seqR: x.data.seqR,
  //         });
  //       });
  //     }
  //   });
  //   return listRoomArray;
  // }

  handleEvent(event: any) {
    // console.log(event);
  }

  getCheckedItemList1() {
    this.checkedList = [];

    for (let index = 0; index < this.itemsF.length; index++) {
      const element = this.itemsF[index];
      let isSelected = false;
      let roomF: any = [];
      element.listRoom.forEach((x: any) => {

        roomF.push({
          idr: x.idr,
          roomName: x.roomName,
          seqR: x.seqR,
          pricePerDay: x.pricePerDay,
          pricePerHoilday: x.pricePerHoilday,
          priceDeposit: x.priceDeposit,
          isSelected: isSelected,
        });
      });
      this.checkedList.push({
        id: element.id,
        seqF: element.seqF,
        floorName: element.floorName,
        listRoom: roomF,
      });
      this.appRef.detectChanges();
    }
  }

  // getCheckedItemList1() {
  //   this.checkedList = [];
  //   for (let index = 0; index < this.itemsF.length; index++) {
  //     const element = this.itemsF[index];
  //     let isSelected = false;
  //     let roomF: any = [];
  //     element.listRoom.forEach((x: any) => {
  //       roomF.push({
  //         idr: x.idr,
  //         seqR: x.seqR,
  //         pricePerDay: x.pricePerDay,
  //         pricePerHoilday: x.pricePerHoilday,
  //         priceDeposit: x.priceDeposit,
  //         isSelected: isSelected,
  //       });
  //     });
  //     // if(this.items[i].isSelected)
  //     this.checkedList.push({
  //       id: element.id,
  //       seqF: element.seqF,
  //       // floorId: element.floorId,
  //       floorName: element.floorName,
  //       listRoom: roomF,
  //     });
  //     this.appRef.detectChanges();
  //   }
  //   // console.log(this.checkedList);
  // }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.screen.width >= 992) {
      // console.log('PC');
      this.mobile = 10;
    } else if (window.screen.width <= 991 && window.screen.width >= 768) {
      this.mobile = 10;
      // console.log('taplet');
    } else {
      // console.log('mobile');
      this.mobile = 10;
    }
  }

  openBackDropCustomClass(content: any) {
    this.priceFrom.controls.pricePerDay.setValue(null);
    this.priceFrom.controls.pricePerHoilday.setValue(null);
    this.priceFrom.controls.priceDeposit.setValue(null);
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  addChange() {
    let day = this.priceFrom.value.pricePerDay;
    let holiday = this.priceFrom.value.pricePerHoilday;
    let deposit = this.priceFrom.value.priceDeposit;

    let round: any = false;
    let floor = this.checkedList;
    if (!round) {
      for (let index = 0; index < floor.length; index++) {
        const element = floor[index].listRoom;
        element.forEach((x: any) => {
          if (x.isSelected === true) {
            x.pricePerDay = day;
            x.pricePerHoilday = holiday;
            x.priceDeposit = deposit;
            this.sv
              .changeRoomPrice(
                floor[index].id,
                x.idr,
                floor[index].seqF,
                x.seqR,
                day,
                holiday,
                deposit
              )
              .then((x: any) => {
                this.toastr.success(
                  'บันทึกห้อง ' + x.roomName + ' ราคาใหม่ เรียบร้อย'
                );
              });

            this.clickRoom(floor[index].id, x.idr);
          }
        });
      }
      // this.getListFloor();
      round = true;
    }

    this.modalService.dismissAll();
  }

  showSuccess() {
    this.toastr.success('บันทึกข้อมูลเรียบร้อย');
  }

  showError() {
    this.toastr.error('บันทึกข้อมูลล้มเหลว');
  }
}
