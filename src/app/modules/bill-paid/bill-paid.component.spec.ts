import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPaidComponent } from './bill-paid.component';

describe('BillComponent', () => {
  let component: BillPaidComponent;
  let fixture: ComponentFixture<BillPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillPaidComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BillPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
