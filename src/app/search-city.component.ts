import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

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
export class SearchCityComponent implements OnInit {
  @Input() city: string = '';
  @Output() citySelected = new EventEmitter<string>();

  ngOnInit() {
    // ngModel will bind to @Input city
  }

  search() {
    if (this.city.trim()) {
      this.citySelected.emit(this.city.trim());
    }
  }
}
