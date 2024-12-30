import {Injectable}     from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WeatherData} from './weather.data';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'; // Import specific operators

import {APP_ID} from './constants';

@Injectable()
export class OpenWeatherService {
    private apiId = APP_ID;
    private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    constructor (private http: HttpClient) {}

    getCurrentWeather(city: string) {
        return  this.http.get(`${this.apiUrl}?q=${city}&appid=${this.apiId}`)
                        .pipe(
                            map(res => <WeatherData> res),
                            catchError(error => {
                                console.error('Error fetching weather data', error);
                                throw error;
                              }))
    };
}