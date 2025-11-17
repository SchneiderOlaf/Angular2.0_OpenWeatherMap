import { Component, Input, AfterViewInit, OnChanges, SimpleChanges, OnDestroy, ElementRef } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `
    <div id="map"></div>
  `
})
export class MapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() lat?: number;
  @Input() lon?: number;
  @Input() zoom: number = 10;
  @Input() city?: string;
  @Input() temp?: number;
  @Input() icon?: string;
  @Input() humidity?: number;
  @Input() unit: 'metric' | 'imperial' = 'metric';
  map: L.Map | null = null;
  marker: L.Marker | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.initMapIfReady();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.map && (changes['lat'] || changes['lon'])) {
      this.updateMarker();
    } else if (this.map && (changes['city'] || changes['temp'] || changes['icon'] || changes['humidity'] || changes['unit'])) {
      // Update popup content when city/temp/icon/humidity change
      this.updatePopup();
    } else {
      this.initMapIfReady();
    }
  }

  initMapIfReady() {
    if (this.map) return;
    if (this.lat === undefined || this.lon === undefined) return;
    const container: HTMLElement = this.el.nativeElement.querySelector('#map');
    this.map = L.map(container).setView([this.lat!, this.lon!], this.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
    this.marker = L.marker([this.lat!, this.lon!]).addTo(this.map);
    this.updatePopup();
  }

  updateMarker() {
    if (!this.map) return;
    if (this.lat === undefined || this.lon === undefined) return;
    this.map.setView([this.lat, this.lon], this.zoom);
    if (this.marker) {
      this.marker.setLatLng([this.lat, this.lon]);
      this.updatePopup();
    } else {
      this.marker = L.marker([this.lat, this.lon]).addTo(this.map);
      this.updatePopup();
    }
  }

  updatePopup() {
    if (!this.marker) return;
    const title = this.city ? `${this.city}` : '';
    let tempTxt = '';
    if (this.temp !== undefined && this.temp !== null) {
      const t = Number(this.temp);
      if (this.unit === 'imperial') {
        const f = (t * 9 / 5) + 32;
        tempTxt = `${f.toFixed(1)} °F`;
      } else {
        tempTxt = `${t.toFixed(1)} °C`;
      }
    }
    const humidityTxt = (this.humidity !== undefined && this.humidity !== null) ? `${this.humidity}%` : '';
    const iconUrl = this.icon ? `http://openweathermap.org/img/wn/${this.icon}@2x.png` : '';
    const content = `
      <div style="display:flex;align-items:center;gap:8px;min-width:220px;">
        ${iconUrl ? `<div style=\"flex:0 0 48px;\"><img src=\"${iconUrl}\" style=\"width:48px;height:48px;display:block;\"/></div>` : ''}
        <div style="flex:1 1 auto;line-height:1.2;">
          <div style="font-weight:600;margin-bottom:4px;">${title}</div>
          <div style="font-size:0.95em;color:#333;margin-bottom:2px;">Temp: <strong>${tempTxt}</strong></div>
          <div style="font-size:0.85em;color:#666;">Humidity: <strong>${humidityTxt}</strong></div>
        </div>
      </div>
    `;
    this.marker.bindPopup(content, { minWidth: 220, className: 'weather-popup' });
    // Open popup automatically when updated
    this.marker.openPopup();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
