import { TestBed } from '@angular/core/testing';

import { ColorChangingService } from './color-changing.service';

describe('ColorChangingService', () => {
  let service: ColorChangingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorChangingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
