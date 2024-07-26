import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-calendar-room',
  templateUrl: './calendar-room.component.html',
  styleUrls: ['./calendar-room.component.scss']
})
export class CalendarRoomComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private sv: DataService,
    public appRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }


  openAllAsset(contentAllAsset: any) {
    // this.getAllasset();
    this.modalService.open(contentAllAsset, {
      backdropClass: 'light-blue-backdrop',
    });
  }


}
