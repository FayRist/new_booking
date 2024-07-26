import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuWaterElectricComponent } from './su-water-electric.component';

describe('SuWaterElectricComponent', () => {
  let component: SuWaterElectricComponent;
  let fixture: ComponentFixture<SuWaterElectricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuWaterElectricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuWaterElectricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
