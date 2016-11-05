import {Component, OnInit} from '@angular/core';
import {WeatherData} from './weather.data';
import {WeatherService} from './weather.service';

@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <div *ngIf="weather">
        <h2>{{weather.name}}</h2>
        <my-weather-detail [weather]="weather"></my-weather-detail>
    </div>
  `,
})

export class AppComponent implements OnInit {
  title = 'Weather';
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