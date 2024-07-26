import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerMonthComponent } from './per-month.component';

describe('PerMonthComponent', () => {
  let component: PerMonthComponent;
  let fixture: ComponentFixture<PerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
