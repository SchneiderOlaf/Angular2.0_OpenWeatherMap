import { Component, Output, EventEmitter } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-city',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <input type="text" [(ngModel)]="city" placeholder="Enter city name" />
      <button (click)="search()">Search</button>
    </div>
  `
})
export class SearchCityComponent {
  city: string = '';
  @Output() citySelected = new EventEmitter<string>();

  search() {
    if (this.city.trim()) {
      this.citySelected.emit(this.city.trim());
    }
  }
}
