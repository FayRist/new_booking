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
import { HttpClient } from '@angular/common/http';
import { SuSvService } from './service/su-sv.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-su-service',
  templateUrl: './su-service.component.html',
  styleUrls: ['./su-service.component.scss'],
})
export class SuServiceComponent implements OnInit {
  items: any = [];
  itemsFood: any = [];

  tableDetailService = new FormGroup({
    id: new FormControl(null),
    serviceName: new FormControl(null),
    servicePrice: new FormControl(null),
    serviceAmount: new FormControl(null),
    type: new FormControl(''),
    reserve: new FormControl('0'),
  });

  tableDetailFood = new FormGroup({
    id: new FormControl(null),
    serviceName: new FormControl(null),
    servicePrice: new FormControl(null),
    type: new FormControl(''),
  });

  model = 1;
  p: number = 1;
  tableNews: any[] = [];
  mobile: any = 10;

  closeResult: string;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private http: HttpClient,
    public appRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private sv: SuSvService
  ) {}

  ngOnInit(): void {
    this.getData();
    if (window.screen.width <= 512) {
      // 768px portrait
      console.log('mobile');
      this.mobile = 5;
    }
  }

  // openBackDropCustomClass(content: any) {
  //   this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  // }

  getData() {
    this.sv.getServiceData().subscribe((listSV: any) => {
      this.items = [];
      this.itemsFood = [];
      listSV.forEach((element: any) => {

        if (element.data.type == 'service') {
          this.items.push(element.data);
        } else if (element.data.type == 'food') {
          this.itemsFood.push(element.data);
        }
      });
      this.appRef.detectChanges();
    });
  }

  openBackDropDetail(contentDetail: any, service: any, type: any) {
    // this.tableDetailService.push(service)
    if (type === 'edit') {

      this.tableDetailService.controls.id.setValue(service.id);
      this.tableDetailService.controls.serviceName.setValue(service.serviceName);
      this.tableDetailService.controls.servicePrice.setValue(service.servicePrice);
      this.tableDetailService.controls.serviceAmount.setValue(service.serviceAmount);
      this.tableDetailService.controls.reserve.setValue(service.reserve);
      this.tableDetailService.controls.type.setValue(service.type);
    } else if (type !== 'edit') {

      this.tableDetailService.controls.id.setValue(null);
      this.tableDetailService.controls.serviceName.setValue(null);
      this.tableDetailService.controls.servicePrice.setValue(null);
      this.tableDetailService.controls.serviceAmount.setValue(null);
      this.tableDetailService.controls.reserve.setValue('0');
      this.tableDetailService.controls.type.setValue('service');
    }

    this.modalService.open(contentDetail, {
      backdropClass: 'light-blue-backdrop',
    });
  }

  openBackDropFood(contentFood: any, service: any, type: any) {
    // this.tableDetailService.push(service)
    if (type === 'edit') {

      this.tableDetailFood.controls.id.setValue(service.id);
      this.tableDetailFood.controls.serviceName.setValue(service.serviceName);
      this.tableDetailFood.controls.servicePrice.setValue(service.servicePrice);
      this.tableDetailFood.controls.type.setValue(service.type);
    } else if (type !== 'edit') {

      this.tableDetailFood.controls.id.setValue(null);
      this.tableDetailFood.controls.serviceName.setValue(null);
      this.tableDetailFood.controls.servicePrice.setValue(null);
      this.tableDetailFood.controls.type.setValue('food');
    }

    this.modalService.open(contentFood, {
      backdropClass: 'light-blue-backdrop',
    });
  }

  addService() {
    let addservice = this.tableDetailService.getRawValue();

    this.items.push(addservice);
    this.modalService.dismissAll();
  }

  addServiceDetail() {

    let data = this.tableDetailService.getRawValue();
    // let item = this.items.filter((x: any) => x.id === data.id);
    if (data.id === null) {
      this.sv.addData(data).then((x: any) => {
        this.showSuccess();
      });
    } else {
      this.sv.updateData(data).then((x: any) => {
        this.showSuccess();
      });
    }

    this.modalService.dismissAll();
  }

  addServiceFood() {

    let data = this.tableDetailFood.getRawValue();
    // let item = this.items.filter((x: any) => x.id === data.id);
    if (data.id === null) {
      this.sv.addDataFood(data).then((x: any) => {
        this.showSuccess();
      });
    } else {
      this.sv.updateDataFood(data).then((x: any) => {
        this.showSuccess();
      });
    }

    this.modalService.dismissAll();
  }

  handleEvent(event: any) {
    console.log(event);
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

  showSuccess() {
    this.toastr.success('บันทึกข้อมูลเรียบร้อย');
  }

  showError() {
    this.toastr.error('บันทึกข้อมูลล้มเหลว');
  }
}
