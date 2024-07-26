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
import { SuAssetService } from './service/su-asset.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-su-asset',
  templateUrl: './su-asset.component.html',
  styleUrls: ['./su-asset.component.scss'],
})
export class SuAssetComponent implements OnInit {
  items: any = [];
  check: boolean = false;
  checkroom: boolean = false;
  itemsF: any = [];

  itemsAsset: any = [];
  listAsset: any = [];

  idfPopup: any;
  idrPopup: any;

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

  addAssetFrom = new FormGroup({
    id: new FormControl(null),
    nameAsset: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
  });

  settingroom: any = 0;

  p: number = 1;
  tableNews: any[] = [];
  allAsset: any = [];
  itemsInRoom: any = [];
  mobile: any = 10;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private sv: SuAssetService,
    public appRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.masterSelected = false;
    // this.getCheckedItemList1();
  }
  ngOnInit(): void {
    this.getListFloor();
    this.getAllasset();
    if (window.screen.width <= 512) {
      // 768px portrait
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
                idr: dataroom.id,
                roomName: dataroom.data.roomName,
                listAsset: [],
              });
              this.getDataAsset(element.id, dataroom.id, listRoomArray);
            });
            // this.getCheckedItemList1();
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

  getDataAsset(floor: any, roomid: any, listRoomArray: any) {
    this.sv.getListAsset(floor, roomid).subscribe((asset: any) => {
      if (asset.length !== 0) {
        asset.forEach((item: any) => {
          let dataAsset = item.data;
          let list = listRoomArray.filter((i: any) => i.idr == dataAsset.idr);

          list[0].listAsset.push(dataAsset);
        });
      }
      this.getCheckedItemList1();
    });
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
          listAsset: x.listAsset || [],
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

  openBackDropCustomClass(content: any, idf: any, idr: any) {

    this.itemsInRoom = []
    this.idfPopup = null;
    this.idfPopup = null;
    this.sv.getAssetInRoom(idf, idr).subscribe((asset: any) => {
      this.idfPopup = idf;
      this.idrPopup = idr;
      this.itemsInRoom = asset;
      this.appRef.detectChanges();
    });
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openAllAsset(contentAllAsset: any) {
    this.getAllasset();
    this.modalService.open(contentAllAsset, {
      backdropClass: 'light-blue-backdrop',
    });
  }

  addService() {
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
            this.clickRoom(floor[index].id, x.idr);
          }
        });
      }
      round = true;
    }

    this.modalService.dismissAll();
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

  showSuccess() {
    this.toastr.success('บันทึกข้อมูลเรียบร้อย');
  }

  showError() {
    this.toastr.error('บันทึกข้อมูลล้มเหลว');
  }

  // -------------------------------------------------

  addAsset() {
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
            this.clickRoom(floor[index].id, x.idr);
          }
        });
      }
      round = true;
    }

    this.modalService.dismissAll();
  }

  deleteAset(idAsset: any) {
    this.sv.deleteAsset(idAsset).then((x: any) => {
      this.toastr.success('ลบข้อมูลเรียบร้อย');
    });
  }

  addAsssetInRoom() {
    let froom = this.itemsInRoom.filter((x: any) => x.idr == this.idrPopup);

    let asset = {
      id: '',
      idr: '',
      nameAsset: '',
      priceAsset: '',
    };

    this.sv
      .addAssetInRoom(this.idfPopup, this.idrPopup, asset)
      .then((x: any) => {
        this.toastr.success('เพิ่มข้อมูลทรัพย์สิน เรียบร้อย');
        console.log(x);

        let asset = {
          id: '',
          idr: '',
          nameAsset: '',
          priceAsset: '',
        };
        froom.forEach((element: any) => {
          element.listRoom.push(asset);
          this.showSuccess();
        });
      });
  }

  addListAsset() {
    let name = this.addAssetFrom.controls.nameAsset.value;
    this.sv.addAsset(name).then((x: any) => {
      this.addAssetFrom.controls.nameAsset.setValue(null);
      this.showSuccess();
    });
    this.appRef.detectChanges();
    console.log(this.allAsset);
  }

  getAllasset() {
    this.sv.getAssetAll().subscribe((asset: any) => {
      this.itemsAsset = asset;
      this.appRef.detectChanges();
    });
  }

  updateAsset(data:any){

    this.sv.updateAssetInRoom(this.idfPopup, this.idrPopup, data.id, data).then((a:any)=>{
      this.showSuccess();
    }).catch(function (error) {
      console.error('Error adding document: ', error);
    });
  }

}
