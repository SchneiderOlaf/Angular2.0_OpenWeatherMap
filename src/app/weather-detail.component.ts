import {Component} from '@angular/core';
import {WeatherData} from './weather.data';
import {calcCelsiusAsString,degreeToDirection,describeWindSpeed,describeHumidity,describeTemperature} from './common/tools';

@Component({
    selector: 'my-weather-detail',
    template: `
    <div *ngIf="weather">
      <div><label>Temperature: </label>{{clacCelsius(weather.main.temp)}} °C ({{feltTemperature(weather.main.temp)}})</div>
      <div><label>Temperature min: </label>{{clacCelsius(weather.main.temp_min)}} °C</div>
      <div><label>Temperature max: </label>{{clacCelsius(weather.main.temp_max)}} °C</div>
      <div><label>Wind: </label>{{windDirection(weather.wind.deg)}} {{weather.wind.speed}} m/s ({{windSpeed(weather.wind.speed)}})</div>
      <div><label>Pressure: </label>{{weather.main.pressure}} hpa</div>
      <div><label>Humidity: </label>{{weather.main.humidity}} % ({{feltHumidity(weather.main.humidity)}})</div>
      <div><label>Cloudiness: </label>{{weather.clouds.all}} %</div>
      <div *ngIf="weather.rain"><label>Rain: </label>{{weather.rain.three_hours}} liter</div>
      <div *ngIf="weather.snow"><label>Snow: </label>{{weather.snow.three_hours}} liter</div>
      <ul class="conditions">
        <li *ngFor="let w of weather.weather">
            <span class="badge">{{w.description}}</span><img src="http://openweathermap.org/img/w/{{w.icon}}.png">
        </li>
      </ul>
    </div>
  `,
    inputs: ['weather'],
    styles: [`
  .conditions {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 10em;
  }
  .conditions li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0em;
    height: 1.6em;
    border-radius: 4px;
  }
  .conditions .text {
    position: relative;
    top: -3px;
  }
  .conditions .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0em 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -10px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0px 0px 4px;
  }`],
    standalone: false
})

export class WeatherDetailComponent {
  public weather: WeatherData;
  
  clacCelsius(kelvin: number) {
    return calcCelsiusAsString(kelvin);
  }

  windDirection(dir: number) {
    return degreeToDirection(dir);
  }

  windSpeed(speed: number) {
    return describeWindSpeed(speed);
  }

  feltHumidity(hum: number) {
    return describeHumidity(hum);
  }

  feltTemperature(temperature: number) {
    return describeTemperature(temperature);
  }
}