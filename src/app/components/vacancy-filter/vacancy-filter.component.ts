import {Component, ElementRef, Output, ViewChild, EventEmitter} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-vacancy-filter',
  templateUrl: './vacancy-filter.component.html',
  styleUrls: ['./vacancy-filter.component.css']
})
export class VacancyFilterComponent {
  searchText = new FormControl('');

  @Output() filterChanged = new EventEmitter<any>();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.searchText.valueChanges
      .pipe(
        debounceTime(100), // Добавляем debounceTime с задержкой 300 мс
        distinctUntilChanged()
      )
      .subscribe((searchText) => {
        this.applyFilter();
      });
  }

  applyFilter(): void {
    const filterData = {
      searchText: this.searchText.value,
    };
    console.log(filterData.searchText); // Check if searchText is captured
    this.filterChanged.emit(filterData);
  }
}
