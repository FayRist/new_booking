import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuAssetComponent } from './su-asset.component';

describe('SuAssetComponent', () => {
  let component: SuAssetComponent;
  let fixture: ComponentFixture<SuAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
