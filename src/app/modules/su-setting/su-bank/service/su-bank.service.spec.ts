/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SuBankService } from './su-bank.service';

describe('Service: SuBank', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuBankService]
    });
  });

  it('should ...', inject([SuBankService], (service: SuBankService) => {
    expect(service).toBeTruthy();
  }));
});
