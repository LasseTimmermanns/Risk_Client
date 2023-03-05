import { TestBed } from '@angular/core/testing';

import { RiskMapService } from './risk-map.service';

describe('RiskMapService', () => {
  let service: RiskMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
