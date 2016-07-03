import {Component} from '@angular/core';
import {WeatherData} from './weather.data';

@Component({
  selector: 'my-weather-detail',
  template: `
    <div *ngIf="weather">
      <div><label>Temprature: </label>{{clacCelsius(weather.main.temp)}} °C</div>
      <div><label>Wind: </label>{{weather.wind.speed}} m/s {{weather.wind.deg}} degrees (meteorological)</div>
      <div><label>Pressure: </label>{{weather.main.pressure}} hpa</div>
      <div><label>Humidity: </label>{{weather.main.humidity}} %</div>
      <ul class="conditions">
        <li *ngFor="#w of weather.weather">
            <span class="badge">{{w.description}}</span><img src="http://openweathermap.org/img/w/{{w.icon}}.png">
        </li>
      </ul>
    </div>
  `,
  inputs: ['weather'],
  styles:[`
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
  }`]
})

export class WeatherDetailComponent {
  public weather: WeatherData;
  
  clacCelsius(kelvin: number) {
    return (kelvin - 273.15).toFixed(2);
  }
}