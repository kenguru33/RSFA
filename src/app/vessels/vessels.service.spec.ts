/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VesselsService } from './vessels.service';

describe('Service: Vessels', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VesselsService]
    });
  });

  it('should ...', inject([VesselsService], (service: VesselsService) => {
    expect(service).toBeTruthy();
  }));
});
