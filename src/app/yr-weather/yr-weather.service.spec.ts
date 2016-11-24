/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YrWeatherService } from './yr-weather.service';

describe('Service: YrWeather', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YrWeatherService]
    });
  });

  it('should ...', inject([YrWeatherService], (service: YrWeatherService) => {
    expect(service).toBeTruthy();
  }));
});
