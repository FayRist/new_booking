import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuFeeComponent } from './su-fee.component';

describe('SuFeeComponent', () => {
  let component: SuFeeComponent;
  let fixture: ComponentFixture<SuFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
