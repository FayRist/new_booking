import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SuPlanService } from './service/su-plan.service';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-su-plan',
  templateUrl: './su-plan.component.html',
  styleUrls: ['./su-plan.component.scss'],
})
export class SuPlanComponent implements OnInit {
  listroom: any = [];
  check: boolean = false;
  // checkroom: boolean = false;
  checkroom = 0;
  selectTypeRoom: any = [
    {
      value: 'rt1',
      text: 'ห้องสำหรับครอบครัว',
    },
    {
      value: 'rt2',
      text: 'ห้องสำหรับสองคน',
    },
  ];

  selectView: any = [
    {
      value: 'rv1',
      text: 'น้ำตก',
    },
    {
      value: 'rv2',
      text: ' ภูเขา',
    },
    {
      value: 'rv3',
      text: ' ไม่มีวิว',
    },
  ];

  tableRoomData = new FormGroup({
    id: new FormControl(null),
    floorName: new FormControl(null),
    seqF: new FormControl(null),
    listRoom: this.fb.array([]),
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    public appRef: ChangeDetectorRef,
    private sv: SuPlanService, // public toastr: ToastrService
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    console.log(this.listroom);
    this.getDataStandard();
  }

  getDataStandard() {
    this.sv.getFloorData().subscribe((floor: any) => {

      if (!this.check) {
        this.listroom = [];
        this.check = true;
        floor.forEach((elementFloor: any) => {
          let listRoomArray: any = [];
          let itemF = elementFloor.data;
          let checkroom = false;
          this.sv.getRoomData(itemF.id).subscribe((room: any) => {
            if (!checkroom) {
              checkroom = true;
              room.forEach((elementRoom: any) => {
                let itemR = elementRoom.data;
                listRoomArray.push({
                  idr: itemR.idr,
                  seqR: itemR.seqR || null,
                  roomView: itemR.roomView || null,
                  roomType: itemR.roomType || null,
                  roomSubBed: itemR.roomSubBed || null,
                  roomPeople: itemR.roomPeople || null,
                  roomName: itemR.roomName || null,
                  priceDeposit: itemR.priceDeposit || null,
                  pricePerDay: itemR.pricePerDay || null,
                  pricePerHoilday: itemR.pricePerHoilday || null,
                });
                this.appRef.detectChanges();
              });
            }
          });

          let floor = {
            id: itemF.id,
            seqF: itemF.seqF,
            floorName: itemF.floorName,
            listRoom: listRoomArray,
          };
          this.listroom.push(floor);
          console.log(this.listroom);
          this.appRef.detectChanges();
        });
      }
    });
  }

  addFloor() {
    let seqidf = Math.floor(Math.random() * Math.floor(20000));

    let floor = {
      id: '',
      seqF: seqidf,
      floorName: '',
      listRoom: [],
    };
    this.listroom.push(floor);
    console.log(this.listroom);
    this.sv.addFloor(floor).then((x: any) => {
      this.showSuccess();
    });
  }

  removeFloor(idDoc: any, seqF: any) {
    this.listroom = this.listroom.filter((x: any) => x.seqF !== seqF);
    this.sv.deleteFloor(idDoc).then((x: any) => {
      this.toastr.success('ลบข้อมูลเรียบร้อย');
    });
  }

  addRoom(idf: any) {
    let seqidr = Math.floor(Math.random() * Math.floor(20000));
    let froom = this.listroom.filter((x: any) => x.id == idf);

    let room = {
      id: '',
      seqR: seqidr,
      roomView: '',
      roomType: '',
      roomSubBed: '',
      roomPeople: '',
      roomName: '',
      priceDeposit: '',
      pricePerDay: '',
      pricePerHoilday: '',
    };



    this.sv.addRoom(idf, room).then((x: any) => {

      console.log(x);

      let room = {
        idr: x,
        seqR: seqidr,
        roomView: '',
        roomType: '',
        roomSubBed: '',
        roomPeople: '',
        roomName: '',
        priceDeposit: null,
        pricePerDay: null,
        pricePerHoilday: null,
      };
      froom.forEach((element: any) => {
        element.listRoom.push(room);
        this.showSuccess();
        this.appRef.detectChanges();
      });
    });
  }

  removeRoom(idf: any, idr: any, seqidF: any, seqidR: any) {
    // let array = [];
    let floor = this.listroom.filter((a: any) => a.seqF == seqidF);

    for (let index = 0; index < floor[0].listRoom.length; index++) {
      const element = floor[0].listRoom;
      floor[0].listRoom = element.filter((x: any) => x.seqR !== seqidR);
    }
    this.sv.deleteRoom(idf, idr).then((x: any) => {
      this.toastr.success('ลบข้อมูลห้องเรียบร้อย');
    });
  }

  save() {
    console.log(this.listroom);
    // this.sv.addRoom();
  }

  changeZone(data: any, id: any) {
    this.sv.changeZoneData(data, id).then((x: any) => {
      this.showSuccess();
      this.appRef.detectChanges();
    });
  }

  changeDataRoom(data: any, idF: any) {

    this.sv.changeRoomData(data, idF).then((x: any) => {
      this.showSuccess();
      this.appRef.detectChanges();
    });
  }

  showSuccess() {
    this.toastr.success('บันทึกข้อมูลเรียบร้อย');
  }

  showError() {
    this.toastr.error('บันทึกข้อมูลล้มเหลว');
  }
}
