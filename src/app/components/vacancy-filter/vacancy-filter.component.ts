import {Component, ElementRef, Output, ViewChild, EventEmitter, AfterViewInit} from '@angular/core';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-vacancy-filter',
  templateUrl: './vacancy-filter.component.html',
  styleUrls: ['./vacancy-filter.component.css']
})
export class VacancyFilterComponent implements AfterViewInit{
  searchText = new FormControl('');
  @Output() filterChanged = new EventEmitter<any>();

  constructor() {
  }

  ngAfterViewInit(): void {
    this.searchText.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((searchText) => {
        this.applyFilter();
        console.log(searchText)
      });
  }

  applyFilter(): void {
    const filterData = {
      searchText: this.searchText.value,
    };
    this.filterChanged.emit(filterData);
  }
}
