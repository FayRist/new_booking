/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SuBillService } from './su-bill.service';

describe('Service: SuBill', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuBillService]
    });
  });

  it('should ...', inject([SuBillService], (service: SuBillService) => {
    expect(service).toBeTruthy();
  }));
});
