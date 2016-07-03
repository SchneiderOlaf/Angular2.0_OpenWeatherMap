import {WeatherData} from './weather.data';
import {OpenWeatherService} from './open_weather.service'
import {CITY} from './constants';
import {Observable}     from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class WeatherService {
  constructor (private _service: OpenWeatherService) {}
  
  getWeather() {
    return this._service.getCurrentWeather(CITY);
  }
}