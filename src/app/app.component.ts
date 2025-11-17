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
  public savedCity: string = '';
  public forecast: any = null;
  public dailyForecast: any[] = [];
  public selectedUnit: 'metric' | 'imperial' = 'metric';

  constructor(private _weatherService: WeatherService) {}

  getWeather(city: string) {
    this._weatherService.getWeather(city).subscribe(
      weather => this.weather = weather,
      error => this.errorMessage = <any>error
    );
  }

  onCitySelected(city: string) {
    localStorage.setItem('selectedCity', city);
    this.savedCity = city;
    this.getWeather(city);
    this.getForecast(city);
  }

  toggleUnit() {
    this.selectedUnit = this.selectedUnit === 'metric' ? 'imperial' : 'metric';
    // refresh displayed data (we keep API responses in metric internally)
    if (this.weather) {
      // no need to refetch from API; just update UI bindings
    }
    if (this.forecast) {
      // update chart by forcing change (chart component listens to unit input)
    }
  }

  getForecast(city: string) {
    this._weatherService.getForecast(city).subscribe(
      (f: any) => {
        this.forecast = f;
        this.dailyForecast = this.groupForecastByDay(f.list);
      },
      error => console.error('Forecast error', error)
    );
  }

  groupForecastByDay(list: any[]): any[] {
    const days: {[date: string]: any[]} = {};
    list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!days[date]) days[date] = [];
      days[date].push(item);
    });
    return Object.keys(days).map(date => {
      const items = days[date];
      const temps = items.map(i => i.main.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);
      // Calculate average precipitation probability (pop)
      const pops = items.map(i => i.pop !== undefined ? i.pop : 0);
      const avgPop = pops.length ? Math.round((pops.reduce((a, b) => a + b, 0) / pops.length) * 100) : 0;
      // Pick icon/desc from midday or first
      let icon = items[Math.floor(items.length/2)].weather[0].icon;
      let desc = items[Math.floor(items.length/2)].weather[0].description;
      // Fallback to first if not available
      if (!icon) icon = items[0].weather[0].icon;
      if (!desc) desc = items[0].weather[0].description;
      return {
        date,
        min,
        max,
        icon,
        desc,
        pop: avgPop
      };
    });
  }

  ngOnInit() {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      this.savedCity = savedCity;
      this.getWeather(savedCity);
      this.getForecast(savedCity);
    }
  }

  formatTempDisplay(value: number): string {
    if (value === undefined || value === null || Number.isNaN(value)) return '';
    if (this.selectedUnit === 'imperial') {
      const f = (Number(value) * 9 / 5) + 32;
      return f.toFixed(1) + ' °F';
    }
    return Number(value).toFixed(1) + ' °C';
  }
  
}
