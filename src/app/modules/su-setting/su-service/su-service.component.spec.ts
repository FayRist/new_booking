import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuServiceComponent } from './su-service.component';

describe('SuServiceComponent', () => {
  let component: SuServiceComponent;
  let fixture: ComponentFixture<SuServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
