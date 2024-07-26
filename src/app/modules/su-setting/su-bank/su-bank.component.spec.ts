import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuBankComponent } from './su-bank.component';

describe('SuBankComponent', () => {
  let component: SuBankComponent;
  let fixture: ComponentFixture<SuBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
