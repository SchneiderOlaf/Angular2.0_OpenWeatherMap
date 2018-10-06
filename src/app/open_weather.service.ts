import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {WeatherData} from './weather.data';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';

import {APP_ID} from './constants';

@Injectable()
export class OpenWeatherService {
    private apiId = APP_ID;
    constructor (private http: Http) {}

    getCurrentWeather(city: string) {
        return this.http.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + this.apiId)
                        .map(res => <WeatherData> res.json())
                        .catch(this.handleError);
    };
    
    private handleError (error:Response) {
        return Observable.throw(error.json().error || 'Server error');
    }
}