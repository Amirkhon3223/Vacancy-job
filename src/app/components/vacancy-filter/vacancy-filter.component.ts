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
    selectedCityControl = new FormControl('all');
    selectedVacancyTypeControl = new FormControl('all');
    @Output() vacancyTypeFilterChanged = new EventEmitter<any>();
    @Output() cityFilterChanged = new EventEmitter<any>();

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
            selectedCity: this.selectedCityControl.value,
            selectedVacancyType: this.selectedVacancyTypeControl.value,
        };
        this.filterChanged.emit(filterData);
    }
}
