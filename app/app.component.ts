import {Component, OnInit} from '@angular/core';
import {HTTP_PROVIDERS}    from '@angular/http';
import {WeatherData} from './weather.data';
import {WeatherService} from './weather.service';
import {OpenWeatherService} from './open_weather.service';
import {WeatherDetailComponent} from './weather-detail.component';
import {Observable}     from 'rxjs/Observable';

@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <div *ngIf="weather">
        <h2>{{weather.name}}</h2>
        <my-weather-detail [weather]="weather"></my-weather-detail>
    </div>
  `,
  directives: [WeatherDetailComponent],
  providers: [
      HTTP_PROVIDERS,
      WeatherService,
      OpenWeatherService
      ]
})

export class AppComponent implements OnInit {
  public title = 'Weather';
  public weather: WeatherData;
  errorMessage: string;
  
  constructor(private _weatherService: WeatherService) {}
  
  getWeather() {
     this._weatherService.getWeather().subscribe(
                        weather => this.weather = weather,
                        error =>  this.errorMessage = <any>error);
  }
  
  ngOnInit() {
    this.getWeather();
  }
  
}