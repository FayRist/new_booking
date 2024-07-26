import { filter } from 'rxjs/operators';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { finalize } from 'rxjs';
import { BillService } from './service/bill.service';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM/YYYY',
  },
  display: {
    dateInput: 'MMMM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;
  constructor(file: File) {
    this.file = file;
  }
}
const pdfMake = require('pdfmake-thai/build/pdfmake');
const pdfFonts = require('pdfmake-thai/build/vfs_fonts');

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BillComponent implements OnInit {
  Today: any = new Date();
  setDayPilot: any = new Date();
  allBillTrue: any = [];
  allBillFalse: any = [];
  billDetail: any;
  paidStatus: any = false;
  priceType: any;
  radioType: any = '1';
  itemsF: any = [];
  itemsBank: any = [];

  allService: any = [];
  allFood: any = [];
  dayCheckIn: any;
  dayCheckOut: any;

  allAmount: any;
  total: any;
  allTotal: any;
  priceRoom: any;

  idDoc: any;
  paidType: any = 'cash';
  datePaid: any = new Date();

  dataPlace: any = [];

  public message: string;
  public imagepath: any;
  imgURL: any;
  image: any = '../../../../assets/media/users/blank_bill.png';
  private basePath = '/uploads/bill';
  selectedFiles?: FileList;
  currentFileUpload: FileUpload;

  constructor(
    private sv: BillService, // public toastr: ToastrService
    private modalService: NgbModal,
    private storage: AngularFireStorage,

    public appRef: ChangeDetectorRef
  ) {
    // var month = this.Today.getUTCMonth() + 1; //months from 1-12
    // var year = this.Today.getUTCFullYear();
    // var day = this.Today.getUTCDate();
    // if (day >= 1) {
    //   this.setDayPilot = year + '-01' + '-' + month;
    // }
  }

  data = new FormGroup({
    date: new FormControl(moment()),
  });

  formBill1 = new FormGroup({
    date: new FormControl(new Date()),
  });

  formBill2 = new FormGroup({
    date: new FormControl(new Date()),
    bankaccount: new FormControl(''),
    imgBill: new FormControl(null),
  });

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.data.controls.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.data.controls.date.setValue(ctrlValue);
    datepicker.close();
  }

  ngOnInit(): void {
    this.sv.getFloorData().subscribe((floor: any) => {
      this.itemsF = [];
      this.itemsF = floor;
      this.appRef.detectChanges();
    });

    this.sv.getBank().subscribe((bank: any) => {
      this.itemsBank = [];
      this.itemsBank = bank;
      this.appRef.detectChanges();
    });

    console.log(this.data.controls.date.value);

    this.sv.getBookingData().subscribe((bill: any) => {
      this.allBillFalse = bill.filter((i: any) => i.paid == false);
      this.allBillTrue = bill.filter((i: any) => i.paid == true);
      this.appRef.detectChanges();
    });

    this.sv.getstandard().subscribe((data: any) => {
      this.dataPlace = data[0];
    });
    // this.data.controls.date.valueChanges.subscribe((x:any)=>{
    //   this.sv.getBookingData(x).subscribe((bill: any) => {
    //     ;
    //     this.allBillFalse = bill.filter((i: any) => i.paid == false);
    //     this.allBillTrue = bill.filter((i: any) => i.paid == true);
    //   });
    // })
  }

  openBackDropDetail(contentDetail: any, data: any) {
    this.billDetail = [];
    this.idDoc = null;
    this.dayCheckIn = null;
    this.dayCheckOut = null;

    this.billDetail = data;
    if (data.paidDate !== null && data.paidDate !== undefined) {
      this.datePaid = new Date(data.paidDate.seconds * 1000);
    }
    this.dayCheckIn = new Date(data.bookingCheckIn.seconds * 1000);
    this.dayCheckOut = new Date(data.bookingCheckOut.seconds * 1000);
    this.appRef.detectChanges();
    this.idDoc = data.id;

    this.priceRoom = data.bookingAmountPeple * data.bookingPrice;

    this.getServiceInRoom(data.id);

    this.modalService.open(contentDetail, {
      backdropClass: 'light-blue-backdrop',
      size: 'xl',
    });
  }

  getServiceInRoom(id: any) {
    this.sv.getServiceInRoom(id).subscribe((item: any) => {
      this.allAmount = 0;
      this.allTotal = 0;
      item.forEach((element: any) => {
        this.allAmount = this.allAmount + Number(element.serviceAmount);
        this.allTotal = this.allTotal + Number(element.servicePrice);
      });
      this.allTotal = this.allTotal + this.priceRoom;
      this.allService = item.filter((i: any) => i.serviceType == 'service');
      this.allFood = item.filter((i: any) => i.serviceType == 'food');
      // this.allService = item;
      this.appRef.detectChanges();
    });
  }

  changeTypePaid(type: any) {
    if (type == '1') {
      this.radioType = '1';
    } else if (type == '2') {
      this.radioType = '2';
    } else if (type == '3') {
      this.radioType = '3';
    }
  }

  updateStatusPaid(type: any, contentConfirm: any) {
    if (type == 'cancel') {
      this.paidStatus = false;
      // this.paidType = 'cancel';
    } else if (type == 'paidRoom') {
      this.paidStatus = true;
      // this.paidType = 'cash';
    } else if (type == 'paidFood') {
      this.paidStatus = true;
      // this.paidType = 'promptpay';
    }
    this.radioType = '1';
    this.modalService.open(contentConfirm, {
      backdropClass: 'light-blue-backdrop',
      size: 'lg',
    });
  }

  changePrice(value: any) {
    if (value == 'pd') {
      this.priceType.setValue('pd');
    } else if (value == 'hd') {
      this.priceType.setValue('hd');
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        const filePath = `${this.basePath}/${this.currentFileUpload.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(
          filePath,
          this.currentFileUpload.file
        );
        uploadTask
          .snapshotChanges()
          .pipe(
            finalize(() => {
              storageRef.getDownloadURL().subscribe((downloadURL) => {
                this.imgURL.setValue(downloadURL);

                this.formBill2.controls.imgBill.setValue(downloadURL);
                this.image = downloadURL;
                this.currentFileUpload.url = downloadURL;
                this.appRef.detectChanges();
                // this.saveFileData(fileUpload);
              });
            })
          )
          .subscribe();
      }
    }
  }

  paid() {
    var paidType = null;
    if (this.radioType == '1') {
      paidType = 'เงินสด';
    } else if (this.radioType == '2') {
      this.radioType = '2';
      paidType = 'โอนเงิน';
    } else if (this.radioType == '3') {
      this.radioType = '3';
      paidType = 'บัตรเครดิต/เดบิต';
    }

    if (this.radioType == '1' || this.radioType == '3') {
      this.sv
        .updateStatusPaid1(
          this.idDoc,
          this.paidStatus,
          paidType,
          this.formBill1.getRawValue(),
          this.priceRoom,
          this.allTotal
        )
        .then((x: any) => {});
    } else if (this.radioType == '2') {
      this.sv
        .updateStatusPaid2(
          this.idDoc,
          this.paidStatus,
          paidType,
          this.formBill2.getRawValue(),
          this.priceRoom,
          this.allTotal
        )
        .then((x: any) => {});
    }
  }

  printBill() {
    var month = this.Today.getUTCMonth() + 1; //months from 1-12
    var year = this.Today.getUTCFullYear();
    var day = this.Today.getUTCDate();
    this.setDayPilot = day + '/' + month + '/' + (year + 543);
    console.log(this.billDetail);
    console.log(this.dataPlace);
    console.log(this.allService);
    let dataListService: any[] = [];
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew-Bold.ttf',
        italics: 'THSarabunNew-Italic.ttf',
        bolditalics: 'THSarabunNew-BoldItalic.ttf',
      },
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf',
      },
    };

    const dd = {
      header: {},
      // footer(currentPage: any, pageCount: any) {
      //   return {
      //     columns: [
      //       { text: 'ท้ายกระดาษ', fontSize: 15, alignment: 'center' },
      //       {
      //         text:
      //           'หน้าที่ ' +
      //           currentPage.toString() +
      //           ' จาก ' +
      //           pageCount +
      //           ' หน้า',
      //         margin: [5, 5, 15, 5],
      //         alignment: 'right',
      //       },
      //     ],
      //   };
      // },
      content: [
        {
          text: 'ใบเสร็จรับเงิน (Receipt)',
          fontSize: 24,
          bold: true,
          alignment: 'right',
        },
        { text: this.dataPlace.nameplace, fontSize: 18, bold: true },
        {
          alignment: 'justify',
          columns: [
            {
              text:
                this.dataPlace.locationplace +
                '\nต.' +
                this.dataPlace.subdistrict +
                ' อ.' +
                this.dataPlace.district +
                ' จ.' +
                this.dataPlace.province +
                '\n E-mail ' +
                this.dataPlace.email +
                '\n ลูกค้า(Customer)\n ' +
                this.billDetail.bookingFullName +
                '\n โทร.',
              style: ['head_size'],
            },
            {
              text:
                'เลขที่(ID) ' +
                this.billDetail.id +
                ' \nวันที่(Date) ' +
                this.setDayPilot +
                ' \n ห้อง ' +
                this.billDetail.bookingRoom +
                ' จอง ' +
                this.billDetail.bookingBookingCountDay +
                ' วัน' +
                ' จำนวน ' +
                this.billDetail.bookingAmountPeple +
                ' คน',
              style: ['head_size', 'head_ID'],
            },
          ],
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', 70, 70],
            body: [
              [
                {
                  border: [false, true, false, true],
                  fillColor: '#eeeeee',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  text: 'รายการ',
                },
                {
                  border: [false, true, false, true],
                  fillColor: '#eeeeee',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  text: 'จำนวน',
                },
                {
                  border: [false, true, false, true],
                  fillColor: '#eeeeee',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  text: 'ราคา',
                },
              ],
              [
                {
                  border: [false, false, false, false],
                  fontSize: 12,
                  bold: true,
                  text: 'ค่าห้องพัก',
                },
                {
                  border: [false, false, false, false],
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                  text: ' ',
                },
                {
                  border: [false, false, false, false],
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                  text: this.priceRoom,
                },
              ],
            ],
          },
        },
        {
          text: 'ลงชื่อ.....................................................ผู้รับเงิน',
          margin: [0, 15, 0, 0],
          style: ['signature'],
        },
        {
          text: '(..................................................)',
          margin: [0, 0, 0, 10],
          style: ['signature'],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 595 - 2 * 40,
              y2: 5,
              lineWidth: 0.5,
              dash: { length: 3, space: 0 },
            },
          ],
        },
        {
          text: 'ใบเสร็จรับเงิน (Receipt)',
          margin: [0, 15, 0, 0],
          fontSize: 24,
          bold: true,
          alignment: 'right',
        },
        { text: this.dataPlace.nameplace, fontSize: 18, bold: true },
        {
          alignment: 'justify',
          columns: [
            {
              text:
                this.dataPlace.locationplace +
                '\nต.' +
                this.dataPlace.subdistrict +
                ' อ.' +
                this.dataPlace.district +
                ' จ.' +
                this.dataPlace.province +
                '\n E-mail ' +
                this.dataPlace.email +
                '\n ลูกค้า(Customer)\n ' +
                this.billDetail.bookingFullName +
                '\n โทร.',
              style: ['head_size'],
            },
            {
              text:
                'เลขที่(ID) ' +
                this.billDetail.id +
                ' \nวันที่(Date) ' +
                this.setDayPilot +
                ' \n ห้อง ' +
                this.billDetail.bookingRoom +
                ' จอง ' +
                this.billDetail.bookingBookingCountDay +
                ' วัน' +
                ' จำนวน ' +
                this.billDetail.bookingAmountPeple +
                ' คน',
              style: ['head_size', 'head_ID'],
            },
          ],
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', 70, 70],
            body: [
              [
                {
                  border: [false, true, false, true],
                  fillColor: '#eeeeee',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  text: 'รายการ',
                },
                {
                  border: [false, true, false, true],
                  fillColor: '#eeeeee',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  text: 'จำนวน',
                },
                {
                  border: [false, true, false, true],
                  fillColor: '#eeeeee',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  text: 'ราคา',
                },
              ],
              [
                {
                  border: [false, false, false, false],
                  fontSize: 12,
                  bold: true,
                  text: 'ค่าห้องพัก',
                },
                {
                  border: [false, false, false, false],
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                  text: ' ',
                },
                {
                  border: [false, false, false, false],
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                  text: this.priceRoom,
                },
              ],
            ],
          },
        },
        {
          text: 'ลงชื่อ.....................................................ผู้รับเงิน',
          margin: [0, 15, 0, 0],
          style: ['signature'],
        },
        {
          text: '(..................................................)',
          margin: [0, 0, 0, 10],
          style: ['signature'],
        },
      ],
      styles: {
        head_size: {
          fontSize: 16,
        },
        head_ID: {
          // fontSize: 18,
          alignment: 'right',
        },
        signature: {
          alignment: 'center',
          fontSize: 16,
        },
      },
      defaultStyle: {
        font: 'THSarabunNew',
      },
      // watermark: {
      //   text: 'ลายน้ำแบบคาด by น้องมิก',
      //   color: 'blue',
      //   opacity: 0.1,
      //   bold: true,
      // },
    };
    let table1: any = dd.content[3].table;
    let table2: any = dd.content[10].table;
    console.log(table2);
    // console.log(this.allService.length);
    // console.log(this.allFood.length);
    debugger;

    this.allService.forEach((element: any) => {
      // --------------------------------------------------
      table1.body.push([
        {
          border: [false, false, false, false],
          fontSize: 12,
          bold: true,
          text: element.serviceName,
        },
        {
          border: [false, false, false, false],
          fontSize: 12,
          alignment: 'right',
          bold: true,
          text: element.serviceAmount,
        },
        {
          border: [false, false, false, false],
          fontSize: 12,
          alignment: 'right',
          bold: true,
          text: element.servicePrice,
        },
      ]);
      // --------------------------------------------------
      table2.body.push([
        {
          border: [false, false, false, false],
          fontSize: 12,
          bold: true,
          text: element.serviceName,
        },
        {
          border: [false, false, false, false],
          fontSize: 12,
          alignment: 'right',
          bold: true,
          text: element.serviceAmount,
        },
        {
          border: [false, false, false, false],
          fontSize: 12,
          alignment: 'right',
          bold: true,
          text: element.servicePrice,
        },
      ]);
    });
    this.allFood.forEach((element: any) => {
      // --------------------------------------------------
      table1.body.push([
        {
          border: [false, false, false, false],
          fontSize: 12,
          bold: true,
          text: element.serviceName,
        },
        {
          border: [false, false, false, false],
          fontSize: 12,
          alignment: 'right',
          bold: true,
          text: element.serviceAmount,
        },
        {
          border: [false, false, false, false],
          fontSize: 12,
          alignment: 'right',
          bold: true,
          text: element.servicePrice,
        },
      ]);
      // --------------------------------------------------
      table2.body.push([
        {
          border: [false, false, false, false],
          fontSize: 12,
          bold: true,
          text: element.serviceName,
        },
        {
          border: [false, false, false, false],
          fontSize: 12,
          alignment: 'right',
          bold: true,
          text: element.serviceAmount,
        },
        {
          border: [false, false, false, false],
          fontSize: 12,
          alignment: 'right',
          bold: true,
          text: element.servicePrice,
        },
      ]);
    });
    table1.body.push([
      {
        border: [false, true, false, false],
        fontSize: 12,
        bold: true,
        alignment: 'right',
        text: 'จำนวนเงินรวมทั้งสิ้น',
      },
      {
        border: [false, true, false, true],
        alignment: 'right',
        fontSize: 12,
        bold: true,
        text: this.allAmount,
      },
      {
        border: [false, true, false, true],
        alignment: 'right',
        fontSize: 12,
        bold: true,
        text: this.allTotal,
      },
    ]);
    table2.body.push([
      {
        border: [false, true, false, false],
        fontSize: 12,
        bold: true,
        alignment: 'right',
        text: 'จำนวนเงินรวมทั้งสิ้น',
      },
      {
        border: [false, true, false, true],
        alignment: 'right',
        fontSize: 12,
        bold: true,
        text: this.allAmount,
      },
      {
        border: [false, true, false, true],
        alignment: 'right',
        fontSize: 12,
        bold: true,
        text: this.allTotal,
      },
    ]);
    console.log(table1.body);

    pdfMake.createPdf(dd).open();
  }

  // openPDF() {
  //   ;
  //   let PDF = new jsPDF('p', 'mm', 'a4');
  //   PDF.addFont('Roboto-Italic.ttf', 'Roboto-Italic', 'normal');
  //   PDF.setFont('Roboto-Italic');

  //   PDF.setFontSize(16);
  //   PDF.text('ใบเสร็จรับเงิน(Receipt)', 100, 20);
  //   // PDF.text('ใบเสร็จรับเงิน (Receipt)', 100, 16, {
  //   //   align: 'right',
  //   // });

  //   // PDF.setFontSize(12);
  //   // PDF.text('This is some normal sized text underneath.', 16, 16);

  //   // let DATA: any = document.getElementById('htmlData');
  //   //
  //   // html2canvas(DATA).then((canvas) => {
  //   //   let fileWidth = 208;
  //   //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //   //   const FILEURI = canvas.toDataURL('image/png');
  //   //   let PDF = new jsPDF('p', 'mm', 'a4');
  //   //   let position = 0;
  //   //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //   //   PDF.save('angular-demo.pdf');
  //   // });
  //   PDF.save('angular-demo.pdf');
  // }

  // generatePDF() {
  //   let docDefinition = {
  //     header: 'C#Corner PDF Header ปแอิอแปิกดหเ',
  //     content:
  //       'Sample PDF generated with Angular and PDFMake for C#Corner Blog',
  //   };

  //   pdfMake.createPdf(docDefinition).open();
  // }

  makePdf() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew-Bold.ttf',
        italics: 'THSarabunNew-Italic.ttf',
        bolditalics: 'THSarabunNew-BoldItalic.ttf',
      },
      Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf',
      },
    };

    const dd = {
      header: {},
      // footer(currentPage: any, pageCount: any) {
      //   return {
      //     columns: [
      //       { text: 'ท้ายกระดาษ', fontSize: 15, alignment: 'center' },
      //       {
      //         text:
      //           'หน้าที่ ' +
      //           currentPage.toString() +
      //           ' จาก ' +
      //           pageCount +
      //           ' หน้า',
      //         margin: [5, 5, 15, 5],
      //         alignment: 'right',
      //       },
      //     ],
      //   };
      // },
      content: [
        {
          text: 'ใบเสร็จรับเงิน (Receipt)',
          fontSize: 24,
          bold: true,
          alignment: 'right',
        },
        { text: 'ชื่อโรงแรม', fontSize: 18, bold: true },
        {
          alignment: 'justify',
          columns: [
            {
              text: 'ที่อยู่\nที่อยู่\nที่อยู่ \n ชื่อลูกค้า\n ชื่อจริง นามสกุล\n โทร',
              style: ['head_size'],
            },
            {
              text: 'เลขที่(ID) \n วันที่(Date) \n ห้อง\n',
              style: ['head_size', 'head_ID'],
            },
          ],
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', 70, 70],
            body: [
              [
                {
                  border: [false, true, false, true],
                  fillColor: '#eeeeee',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  text: 'รายการ',
                },
                {
                  border: [false, true, false, true],
                  fillColor: '#eeeeee',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  text: 'จำนวน',
                },
                {
                  border: [false, true, false, true],
                  fillColor: '#eeeeee',
                  alignment: 'center',
                  fontSize: 16,
                  bold: true,
                  text: 'ราคา',
                },
              ],
              // ส่วนของข้อมูล
              [
                {
                  border: [false, false, false, false],
                  fontSize: 12,
                  bold: true,
                  text: 'ค่าห้องพัก',
                },
                {
                  border: [false, false, false, false],
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                  text: '1',
                },
                {
                  border: [false, false, false, false],
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                  text: '5000',
                },
              ],
              [
                {
                  border: [false, false, false, false],
                  fontSize: 12,
                  bold: true,
                  text: 'ค่าห้องพัก',
                },
                {
                  border: [false, false, false, false],
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                  text: '1',
                },
                {
                  border: [false, false, false, false],
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                  text: '5000',
                },
              ],
              [
                {
                  border: [false, true, false, false],
                  fontSize: 12,
                  bold: true,
                  alignment: 'right',
                  text: 'จำนวนเงินรวมทั้งสิ้น',
                },
                {
                  border: [false, true, false, true],
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                  text: '1',
                },
                {
                  border: [false, true, false, true],
                  alignment: 'center',
                  fontSize: 12,
                  bold: true,
                  text: '5000',
                },
              ],
            ],
          },
        },
        {
          text: 'ลงชื่อ.....................................................ผู้รับเงิน',
          margin: [0, 40, 0, 0],
          style: ['signature'],
        },
        {
          text: '(..................................................)',
          margin: [0, 0, 0, 40],
          style: ['signature'],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 595 - 2 * 40,
              y2: 5,
              lineWidth: 0.5,
              dash: { length: 3, space: 0 },
            },
          ],
        },
        // { text: 'ชื่อโรงแรม', style: [ 'header', 'anotherStyle' ] },
        // { text: 'เลขที่(ID)', style: [ 'header', 'anotherStyle' ] },
      ],
      styles: {
        head_size: {
          fontSize: 16,
        },
        head_ID: {
          // fontSize: 18,
          alignment: 'right',
        },
        signature: {
          alignment: 'center',
          fontSize: 16,
        },
      },
      defaultStyle: {
        font: 'THSarabunNew',
      },
      // watermark: {
      //   text: 'ลายน้ำแบบคาด by น้องมิก',
      //   color: 'blue',
      //   opacity: 0.1,
      //   bold: true,
      // },
    };
    pdfMake.createPdf(dd).open();
  }
}

// https://www.wfonts.com/download/data/2016/04/301/sarabun/Sarabun-Regular.ttf
