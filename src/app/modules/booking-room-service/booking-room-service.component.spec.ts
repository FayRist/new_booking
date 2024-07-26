import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRoomServiceComponent } from './booking-room-service.component';

describe('BookingRoomServiceComponent', () => {
  let component: BookingRoomServiceComponent;
  let fixture: ComponentFixture<BookingRoomServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingRoomServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingRoomServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
