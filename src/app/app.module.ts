import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherDetailComponent } from './weather-detail.component';
import { WeatherService } from './weather.service';
import { OpenWeatherService } from './open_weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    WeatherService,
    OpenWeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
