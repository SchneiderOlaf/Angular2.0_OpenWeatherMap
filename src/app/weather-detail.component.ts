import {Component, Input} from '@angular/core';
import {WeatherData} from './weather.data';
import {calcCelsiusAsString,degreeToDirection,describeWindSpeed,describeHumidity,describeTemperature} from './common/tools';

@Component({
    selector: 'my-weather-detail',
    template: `
    <div class="container">
      <h2>Weather Details</h2>
      <div *ngIf="weather" class="weather-detail">
        <div class="card weather-info">
          <strong>Temperature:</strong> {{ formatTempDisplay(weather.main.temp) }} ({{feltTemperature(weather.main.temp)}})
        </div>
        <div class="card weather-info">
          <strong>Min:</strong> {{ formatTempDisplay(weather.main.temp_min) }}
        </div>
        <div class="card weather-info">
          <strong>Max:</strong> {{ formatTempDisplay(weather.main.temp_max) }}
        </div>
        <div class="card weather-info">
          <strong>Wind:</strong> {{windDirection(weather.wind.deg)}} {{weather.wind.speed}} m/s ({{windSpeed(weather.wind.speed)}})
        </div>
        <div class="card weather-info">
          <strong>Pressure:</strong> {{weather.main.pressure}} hpa
        </div>
        <div class="card weather-info">
          <strong>Humidity:</strong> {{weather.main.humidity}} % ({{feltHumidity(weather.main.humidity)}})
        </div>
        <div class="card weather-info">
          <strong>Cloudiness:</strong> {{weather.clouds.all}} %
        </div>
        <div *ngIf="weather.rain" class="card weather-info">
          <strong>Rain:</strong> {{weather.rain.three_hours}} liter
        </div>
        <div *ngIf="weather.snow" class="card weather-info">
          <strong>Snow:</strong> {{weather.snow.three_hours}} liter
        </div>
        <ul class="conditions">
          <li *ngFor="let w of weather.weather">
            <span class="badge">{{w.description}}</span>
            <img class="weather-icon" src="http://openweathermap.org/img/w/{{w.icon}}.png" alt="Weather Icon">
          </li>
        </ul>
      </div>
      <div *ngIf="!weather" class="card">
        <p>No weather data available.</p>
      </div>
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
  @Input() unit: 'metric' | 'imperial' = 'metric';
  
  clacCelsius(kelvin: number) {
    return calcCelsiusAsString(kelvin);
  }

  formatTempDisplay(value: number) {
    if (value === undefined || value === null) return '';
    // value is expected to be Celsius (API returns metric). If unit is imperial, convert.
    if (this.unit === 'imperial') {
      const f = (Number(value) * 9 / 5) + 32;
      return f.toFixed(1) + ' °F';
    }
    return Number(value).toFixed(1) + ' °C';
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
    // describeTemperature expects Celsius; if unit is imperial, convert back to Celsius
    let celsius = temperature;
    if (this.unit === 'imperial') {
      // input temperature is in Celsius (from API); description uses Celsius thresholds
      celsius = temperature;
    }
    return describeTemperature(celsius);
  }
}