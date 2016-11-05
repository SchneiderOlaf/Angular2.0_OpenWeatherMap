import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { WeatherDetailComponent } from './weather-detail.component';
import { WeatherService } from './weather.service';
import { OpenWeatherService } from './open_weather.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    WeatherDetailComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
      WeatherService,
      OpenWeatherService
      ]
})
export class AppModule { }