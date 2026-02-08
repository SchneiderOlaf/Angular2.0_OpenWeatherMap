import {OpenWeatherService} from './open_weather.service'
import {Injectable} from '@angular/core';

@Injectable()
export class WeatherService {
  constructor (private _service: OpenWeatherService) {}
  
  getWeather(city: string) {
    return this._service.getCurrentWeather(city);
  }

  getForecast(city: string) {
    return this._service.get5DayForecast(city);
  }
}