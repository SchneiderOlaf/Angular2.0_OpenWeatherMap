import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {WeatherData} from './weather.data';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class OpenWeatherService {
    private apiId = "xxxxx";
    constructor (private http: Http) {}

    getCurrentWeather(city: string) {
        return this.http.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + this.apiId)
                        .map(res => <WeatherData> res.json())
                        .catch(this.handleError);
    };
    
    private handleError (error:Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}