import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SuBankService } from './service/su-bank.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-su-bank',
  templateUrl: './su-bank.component.html',
  styleUrls: ['./su-bank.component.scss'],
})
export class SuBankComponent implements OnInit {
  priceFrom: any;
  bank: any;

  banklist: any;

  iddelete: any;

  addbankFrom = new FormGroup({
    id: new FormControl(''),
    bankCode: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    bankBranch: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    bankAccountNameF: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    bankAccountNameL: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
    bankAccountNumber: new FormControl(null, [
      Validators.required,
      Validators.nullValidator,
    ]),
  });

  rawdata: any;
  constructor(
    private sv: SuBankService,
    public appRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.sv.getData().subscribe((item: any) => {
      this.banklist = item;
      this.appRef.detectChanges();
    });
  }

  addBank() {

    if (this.addbankFrom.controls.id.value === null) {
      this.sv.addBank(this.addbankFrom.getRawValue()).then((x: any) => {
        this.modalService.dismissAll();
        this.showSuccess();
      });
    } else if (this.addbankFrom.controls.id.value !== null) {
      this.sv.updateBank(this.addbankFrom.getRawValue()).then((x: any) => {
        this.modalService.dismissAll();
        this.showSuccess();
      });
    }
  }

  deleteBank() {

    this.sv.deleteBank(this.iddelete).then((x: any) => {
      this.modalService.dismissAll();
      this.toastr.success('ลบข้อมูลเรียบร้อย');
    });
  }

  openAddBank(content: any, data: any, type: any) {
    if (type === 'create') {
      this.addbankFrom.reset();
    } else if (type === 'edit') {
      this.addbankFrom.controls.id.setValue(data.id);
      this.addbankFrom.controls.bankCode.setValue(data.bankCode);
      this.addbankFrom.controls.bankBranch.setValue(data.bankBranch);
      this.addbankFrom.controls.bankAccountNameF.setValue(
        data.bankAccountNameF
      );
      this.addbankFrom.controls.bankAccountNameL.setValue(
        data.bankAccountNameL
      );
      this.addbankFrom.controls.bankAccountNumber.setValue(
        data.bankAccountNumber
      );
    }

    this.modalService.open(content, {
      backdropClass: 'light-blue-backdrop',
    });
  }

  openDeleteBank(contentDelete: any, id: any) {
    this.iddelete = null;
    this.iddelete = id;
    this.modalService.open(contentDelete, {
      backdropClass: 'light-blue-backdrop',
    });
  }

  showSuccess() {
    this.toastr.success('บันทึกข้อมูลเรียบร้อย');
  }

  showError() {
    this.toastr.error('บันทึกข้อมูลล้มเหลว');
  }
}
