import { TestBed } from '@angular/core/testing';

import { HungarianService } from './hungarian.service';

describe('HungarianService', () => {
  let service: HungarianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HungarianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
