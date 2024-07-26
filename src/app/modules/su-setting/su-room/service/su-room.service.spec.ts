import { TestBed } from '@angular/core/testing';

import { SuRoomService } from './su-room.service';

describe('SuRoomService', () => {
  let service: SuRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
