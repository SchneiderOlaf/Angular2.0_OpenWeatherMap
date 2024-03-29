import {Injectable}     from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherData} from './weather.data';
import {throwError}     from 'rxjs'
import { catchError, map } from 'rxjs/operators';
import 'rxjs/Rx';

import {APP_ID} from './constants';

@Injectable()
export class OpenWeatherService {
    private apiId = APP_ID;
    constructor (private http: HttpClient) {}

    getCurrentWeather(city: string) {
        return  this.http.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + this.apiId)
                        .pipe(map(res => <WeatherData> res))
                        .pipe(catchError(error => throwError( error.message || 'Server error')))
    };
}