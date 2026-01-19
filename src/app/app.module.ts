import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchCityComponent } from './search-city.component';
import { provideHttpClient, withInterceptorsFromDi }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherDetailComponent } from './weather-detail.component';
import { WeatherService } from './weather.service';
import { OpenWeatherService } from './open_weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({ declarations: [
    AppComponent,
    WeatherDetailComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        SearchCityComponent], providers: [
        WeatherService,
        OpenWeatherService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
