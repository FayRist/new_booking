import { RegistrationComponent } from './../../auth/components/registration/registration.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from 'express';
import { SuBillService } from './service/su-bill.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;
  constructor(file: File) {
    this.file = file;
  }
}

@Component({
  selector: 'app-su-bill',
  templateUrl: './su-bill.component.html',
  styleUrls: ['./su-bill.component.scss']
})
export class SuBillComponent implements OnInit {

  bill = new FormGroup({
    id: new FormControl(''),
    typeBiz: new FormControl(''),
    apartmentName: new FormControl(''),
    address: new FormControl(''),
    taxId: new FormControl(''),
    phonenumber: new FormControl(''),
    mail: new FormControl(''),
    logoPath: new FormControl(''),
  });

  submit= false;

  public message: string;
  public imagepath :any;
  imgURL: any;
  image: any = '../../../../assets/media/users/blank.png';
  private basePath = '/uploads/logo';
  selectedFiles?: FileList;
  currentFileUpload: FileUpload;

  constructor(
    private sv: SuBillService,
    public appRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    ) {}

  onSubmit() {
    if(this.bill.controls.id.value !== null){

        this.sv.updateBill(this.bill.getRawValue()).then((x: any) => {
          this.modalService.dismissAll();
          this.showSuccess();
        });
    }else if(this.bill.controls.id.value === null){

        this.sv.addbill(this.bill.getRawValue()).then((x: any) => {
          this.modalService.dismissAll();
          this.showSuccess();
        });
    }
  }

  ngOnInit(): void {
    this.sv.getData().subscribe((item:any)=>{

      if(item.length !== 0){
        this.bill.controls.id.setValue(item[0].id)
        this.bill.controls.typeBiz.setValue(item[0].typeBiz)
        this.bill.controls.apartmentName.setValue(item[0].apartmentName)
        this.bill.controls.address.setValue(item[0].address)
        this.bill.controls.taxId.setValue(item[0].taxId)
        this.bill.controls.phonenumber.setValue(item[0].phonenumber)
        this.bill.controls.mail.setValue(item[0].mail)
        this.bill.controls.logoPath.setValue(item[0].logoPath)

        this.image = item[0].logoPath;
      } else {
        this.bill.reset();
      }
    })
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
        const uploadTask = this.storage.upload(filePath, this.currentFileUpload.file);
        uploadTask.snapshotChanges().pipe(
          finalize(() => {

            storageRef.getDownloadURL().subscribe(downloadURL => {

              this.bill.controls.logoPath.setValue(downloadURL);
              this.image = downloadURL;
              this.currentFileUpload.url = downloadURL;
              this.appRef.detectChanges();
              // this.saveFileData(fileUpload);
            });
          })
        ).subscribe();
      }
    }
  }

  showSuccess() {
    this.toastr.success('บันทึกข้อมูลเรียบร้อย');
  }

  showError() {
    this.toastr.error('บันทึกข้อมูลล้มเหลว');
  }
}
