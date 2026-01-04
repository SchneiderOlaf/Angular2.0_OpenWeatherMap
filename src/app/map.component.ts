import { Component, Input, AfterViewInit, OnChanges, SimpleChanges, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `
    <div id="map" #mapContainer></div>
  `
})
export class MapComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('mapContainer', { static: false }) private mapContainer?: ElementRef<HTMLDivElement>;
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
    const container: HTMLElement | undefined = this.mapContainer ? this.mapContainer.nativeElement : this.el.nativeElement.querySelector('#map');
    if (!container) return;
    this.map = L.map(container).setView([this.lat!, this.lon!], this.zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
    this.marker = L.marker([this.lat!, this.lon!]).addTo(this.map);
    this.updatePopup();
    // Ensure Leaflet recalculates size after CSS/layout changes
    this.scheduleInvalidate();
  }

  updateMarker() {
    if (!this.map) return;
    if (this.lat === undefined || this.lon === undefined) return;
    this.map.setView([this.lat, this.lon], this.zoom);
    if (this.marker) {
      this.marker.setLatLng([this.lat, this.lon]);
      this.updatePopup();
      this.scheduleInvalidate();
    } else {
      this.marker = L.marker([this.lat, this.lon]).addTo(this.map);
      this.updatePopup();
      this.scheduleInvalidate();
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
    // Popup/open may change map layout; ensure Leaflet updates
    this.scheduleInvalidate();
  }

  private scheduleInvalidate(delay = 120) {
    // run after layout completes so Leaflet can compute sizes correctly
    // retry until the container has a non-zero size or max attempts reached
    const maxAttempts = 8;
    let attempts = 0;
    const tryInvalidate = () => {
      attempts++;
      try {
        if (this.map) {
          try { this.map.invalidateSize(); } catch (e) { /* ignore */ }
          const container = this.map.getContainer();
          const rect = container ? (container as HTMLElement).getBoundingClientRect() : null;
          const hasSize = rect && rect.width > 0 && rect.height > 0;
          if (!hasSize && attempts < maxAttempts) {
            requestAnimationFrame(tryInvalidate);
          }
        }
      } catch (e) {
        if (attempts < maxAttempts) requestAnimationFrame(tryInvalidate);
      }
    };
    setTimeout(tryInvalidate, delay);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
