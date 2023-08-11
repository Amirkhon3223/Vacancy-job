import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-vacancy-filter',
  templateUrl: './vacancy-filter.component.html',
  styleUrls: ['./vacancy-filter.component.css']
})
export class VacancyFilterComponent {
  searchText = new FormControl('');
  selectedCityControl = new FormControl('all');
  selectedVacancyTypeControl = new FormControl('all');

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  @Output() filterChanged = new EventEmitter<any>();

  constructor() {}

  ngAfterViewInit(): void {
    this.searchText.valueChanges
        .pipe(
            debounceTime(300),
            distinctUntilChanged()
        )
        .subscribe((searchText) => {
          this.applyFilter();
        });

    this.selectedCityControl.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(() => {
          this.applyFilter();
        });

    this.selectedVacancyTypeControl.valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(() => {
          this.applyFilter();
        });
  }

  applyFilter(): void {
    const filterData = {
      searchText: this.searchText.value,
      selectedCity: this.selectedCityControl.value,
      selectedVacancyType: this.selectedVacancyTypeControl.value,
    };
    this.filterChanged.emit(filterData);
  }
}
