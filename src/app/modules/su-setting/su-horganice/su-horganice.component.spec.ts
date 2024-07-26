import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuHorganiceComponent } from './su-horganice.component';

describe('SuHorganiceComponent', () => {
  let component: SuHorganiceComponent;
  let fixture: ComponentFixture<SuHorganiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuHorganiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuHorganiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
