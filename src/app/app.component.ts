import {Component, OnInit} from '@angular/core';
import {WeatherData} from './weather.data';
import {WeatherService} from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
