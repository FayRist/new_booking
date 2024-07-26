import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuSettingComponent } from './su-setting.component';

describe('SuSettingComponent', () => {
  let component: SuSettingComponent;
  let fixture: ComponentFixture<SuSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
