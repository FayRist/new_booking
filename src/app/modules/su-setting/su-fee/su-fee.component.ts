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
import { SuFeeService } from './service/su-fee.service';

@Component({
  selector: 'app-su-fee',
  templateUrl: './su-fee.component.html',
  styleUrls: ['./su-fee.component.scss'],
})
export class SuFeeComponent implements OnInit {
  dataListFee: any = [];

  items: any = [];
  check: boolean = false;
  checkroom: boolean = false;
  itemsF: any = [];

  priceFrom = new FormGroup({
    remarkFee: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    priceFee: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    amountFee: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
  });

  settingroom: any = 0;

  p: number = 1;
  tableNews: any[] = [];
  mobile: any = 10;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public appRef: ChangeDetectorRef,
    private sv: SuFeeService,
    private modalService: NgbModal
  ) {
    this.masterSelected = false;
  }

  ngOnInit(): void {
    this.getListFloor();
    if (window.screen.width <= 512) {
      console.log('mobile');
      this.mobile = 5;
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
            room.forEach((dataroom: any) => {

              listRoomArray.push({
                id: dataroom.id,
                roomName: dataroom.data.roomName,
                listFee: [],
              });
              this.getDataFee(element.id, dataroom.id, listRoomArray);
            });
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

  getDataFee(floor: any, roomid: any, listRoomArray: any) {
    this.sv.getListFee(floor, roomid).subscribe((fee: any) => {
      if (fee.length !== 0) {
        fee.forEach((item: any) => {
          let dataFee = item.data;
          let list = listRoomArray.filter((i: any) => i.id == dataFee.idr);

          list[0].listFee.push(dataFee);
        });
      }
      this.getCheckedItemList1();
    });
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
    console.log(this.checkedList);
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

  handleEvent(event: any) {
    console.log(event);
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
          listFee: x.listFee || [],
          isSelected: isSelected,
        });
      });
      this.checkedList.push({
        id: element.id,
        floorName: element.floorName,
        listRoom: roomF,
      });
      this.appRef.detectChanges();
    }
    console.log(this.checkedList);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.screen.width >= 992) {
      console.log('PC');
      this.mobile = 10;
    } else if (window.screen.width <= 991 && window.screen.width >= 768) {
      this.mobile = 10;
      console.log('taplet');
    } else {
      console.log('mobile');
      this.mobile = 10;
    }
  }

  openBackDropCustomClass(content: any, fid: any, item: any) {
    this.dataListFee = [];
    this.dataListFee = item.listFee;
    // this.priceFrom.controls.priceFee.setValue(null);
    this.modalService.open(content, {
      backdropClass: 'light-blue-backdrop',
      size: 'lg',
    });
  }

  addFee() {
    let fee = this.priceFrom.value.priceFee;

    let round: any = false;
    let floor = this.checkedList;
    if (!round) {
      for (let index = 0; index < floor.length; index++) {
        const element = floor[index].listRoom;
        element.forEach((x: any) => {
          if (x.isSelected === true) {
            x.priceFee = fee;
            this.clickRoom(floor[index].id, x.idr);
          }
        });
      }
      round = true;
    }

    this.modalService.dismissAll();
  }
}
