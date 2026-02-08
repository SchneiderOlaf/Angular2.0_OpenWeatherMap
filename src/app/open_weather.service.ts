import {Injectable}     from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        // request metric units so temperature values are returned in Celsius
        return  this.http.get(`${this.apiUrl}?q=${encodeURIComponent(city)}&appid=${this.apiId}&units=metric`)
                        .pipe(
                            map(res => <WeatherData> res),
                            catchError(error => {
                                console.error('Error fetching weather data', error);
                                throw error;
                              }))
    };

    get5DayForecast(city: string) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${this.apiId}&units=metric`;
        return this.http.get(url).pipe(
            map(res => res),
            catchError(error => {
                console.error('Error fetching 5-day forecast', error);
                throw error;
            })
        );
    }
}