import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {debounce, debounceTime, distinctUntilChanged, fromEvent, map, Subject} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-vacancy-filter',
  templateUrl: './vacancy-filter.component.html',
  styleUrls: ['./vacancy-filter.component.css']
})
export class VacancyFilterComponent {
  searchText = new FormControl('');
  selectedCity = '';
  selectedVacancyType = '';

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  private filterSubject = new Subject<any>(); // Добавляем это

  @Output() filterChanged = this.filterSubject.asObservable();

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
  }

  applyFilter(): void {
    const filterData = {
      searchText: this.searchText.value,
      selectedCity: this.selectedCity,
      selectedVacancyType: this.selectedVacancyType,
    };
    this.filterSubject.next(filterData);
  }
}
