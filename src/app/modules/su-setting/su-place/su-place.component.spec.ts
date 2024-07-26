import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuPlaceComponent } from './su-place.component';

describe('SuPlaceComponent', () => {
  let component: SuPlaceComponent;
  let fixture: ComponentFixture<SuPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
