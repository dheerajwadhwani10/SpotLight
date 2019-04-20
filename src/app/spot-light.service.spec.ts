import { TestBed } from '@angular/core/testing';

import { SpotLightService } from './spot-light.service';

describe('SpotLightService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotLightService = TestBed.get(SpotLightService);
    expect(service).toBeTruthy();
  });
});
