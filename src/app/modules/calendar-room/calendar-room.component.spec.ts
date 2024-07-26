import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarRoomComponent } from './calendar-room.component';

describe('CalendarRoomComponent', () => {
  let component: CalendarRoomComponent;
  let fixture: ComponentFixture<CalendarRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
