import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuPlanComponent } from './su-plan.component';

describe('SuPlanComponent', () => {
  let component: SuPlanComponent;
  let fixture: ComponentFixture<SuPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
