import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlaceService } from './place.service';
import { Router } from '@angular/router';
import tambons from '../thai_tambons.json';
import amphures from '../thai_amphures.json';
import provinces from '../thai_provinces.json';
@Component({
  selector: 'app-su-place',
  templateUrl: './su-place.component.html',
  styleUrls: ['./su-place.component.scss'],
})
export class SuPlaceComponent implements OnInit {
  place = new FormGroup({
    apartmentName: new FormControl(''),
    address: new FormControl(''),
    province: new FormControl(''),
    district: new FormControl(''),
    subdistrict: new FormControl(''),
    zipcode: new FormControl(''),
    email: new FormControl(''),
  });
  province: any = provinces;
  amphure: any = amphures;
  tambon: any = tambons;
  changeProvince(value: any) {
    this.place.controls.district.setValue('');
    this.place.controls.subdistrict.setValue('');
    const filterValue = (value.target as HTMLInputElement).value;
    this.amphure = amphures;
    this.amphure = this.amphure.filter(
      (x: any) => x.province_id === parseInt(filterValue)
    );
  }
  changeAmp(value: any) {
    this.place.controls.subdistrict.setValue('');
    const filterValue = (value.target as HTMLInputElement).value;
    this.tambon = tambons;
    this.tambon = this.tambon.filter(
      (x: any) => x.amphure_id === parseInt(filterValue)
    );
    this.place.controls.zipcode.setValue(this.tambon[0].zip_code);
  }
  changeTum(value: any) {
    const filterValue = (value.target as HTMLInputElement).value;
    var tambon = this.tambon.filter((x: any) => x.id === parseInt(filterValue));
    this.place.controls.zipcode.setValue(tambon[0].zip_code);
    this.appRef.detectChanges();
  }
  onSubmit() {
    this.sv.addData(this.place.getRawValue());
  }
  constructor(
    private router: Router,
    private sv: PlaceService,
    private http: HttpClient,
    public appRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sv.getData().subscribe((item: any) => {
      if (item.length !== 0) {
        this.place.controls.apartmentName.setValue(item[0].nameplace);
        this.place.controls.apartmentName.setValue(item[0].nameplace);
        this.place.controls.address.setValue(item[0].locationplace);
        this.place.controls.province.setValue(item[0].province);
        this.place.controls.district.setValue(item[0].district);
        this.place.controls.subdistrict.setValue(item[0].subdistrict);
        this.place.controls.zipcode.setValue(item[0].zipcode);
        this.place.controls.email.setValue(item[0].email);
      } else {
        this.place.reset();
      }
    });
  }
}
