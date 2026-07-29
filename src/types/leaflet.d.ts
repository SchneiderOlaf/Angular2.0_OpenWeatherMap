declare module 'leaflet' {
  export class Map {
    setView(coords: [number, number], zoom: number): this;
    invalidateSize(): this;
    remove(): this;
    getContainer(): HTMLElement;
  }

  export class Marker {
    addTo(map: Map): this;
    bindPopup(content: string, options?: any): this;
    openPopup(): this;
    setLatLng(coords: [number, number]): this;
  }

  export function map(container: HTMLElement | string): Map;
  export function tileLayer(url: string, options?: any): any;
  export function marker(coords: [number, number]): Marker;
}
