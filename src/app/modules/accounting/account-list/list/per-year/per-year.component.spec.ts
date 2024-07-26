import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerYearComponent } from './per-year.component';

describe('PerYearComponent', () => {
  let component: PerYearComponent;
  let fixture: ComponentFixture<PerYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
