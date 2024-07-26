/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SuSvService } from './su-sv.service';

describe('Service: SuSv', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuSvService]
    });
  });

  it('should ...', inject([SuSvService], (service: SuSvService) => {
    expect(service).toBeTruthy();
  }));
});
