import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuBillComponent } from './su-bill.component';

describe('SuBillComponent', () => {
  let component: SuBillComponent;
  let fixture: ComponentFixture<SuBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
