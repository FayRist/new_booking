/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SuFeeService } from './su-fee.service';

describe('Service: SuFee', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuFeeService]
    });
  });

  it('should ...', inject([SuFeeService], (service: SuFeeService) => {
    expect(service).toBeTruthy();
  }));
});
