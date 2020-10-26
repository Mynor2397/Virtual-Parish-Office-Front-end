import { TestBed } from '@angular/core/testing';

import { PriestService } from './priest.service';

describe('PriestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriestService = TestBed.get(PriestService);
    expect(service).toBeTruthy();
  });
});
