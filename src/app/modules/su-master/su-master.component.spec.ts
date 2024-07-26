import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuMasterComponent } from './su-master.component';

describe('SuMasterComponent', () => {
  let component: SuMasterComponent;
  let fixture: ComponentFixture<SuMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
