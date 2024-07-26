/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SuRoomListComponent } from './su-room-list.component';

describe('SuRoomListComponent', () => {
  let component: SuRoomListComponent;
  let fixture: ComponentFixture<SuRoomListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuRoomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
