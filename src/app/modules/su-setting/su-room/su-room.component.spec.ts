import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuRoomComponent } from './su-room.component';

describe('SuRoomComponent', () => {
  let component: SuRoomComponent;
  let fixture: ComponentFixture<SuRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
