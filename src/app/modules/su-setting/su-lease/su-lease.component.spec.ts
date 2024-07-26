import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuLeaseComponent } from './su-lease.component';

describe('SuLeaseComponent', () => {
  let component: SuLeaseComponent;
  let fixture: ComponentFixture<SuLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuLeaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
