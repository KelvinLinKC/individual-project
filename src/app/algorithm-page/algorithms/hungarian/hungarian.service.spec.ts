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

  it('test correctness x1000', () => {
    let stable: boolean = true;
    for (let i = 0; i < 1000; i++) {
      service.run(1, 100, 3);
      if (!service.stable) {
        stable = false;
      }
    }
    
    expect(stable).toBeTrue();
  });

});
