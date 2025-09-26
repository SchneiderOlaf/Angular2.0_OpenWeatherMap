import {Component, OnInit} from '@angular/core';
import {WeatherData} from './weather.data';
import {WeatherService} from './weather.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'Weather';
  public weather: WeatherData;
  errorMessage: string;
  
  constructor(private _weatherService: WeatherService) {}
  
  getWeather(city: string) {
    this._weatherService.getWeather(city).subscribe(
      weather => this.weather = weather,
      error => this.errorMessage = <any>error
    );
  }

  onCitySelected(city: string) {
    this.getWeather(city);
  }

  ngOnInit() {
    // Optionally, load default weather or leave empty
  }
  
}
