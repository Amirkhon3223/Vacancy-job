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
  selectedCity = "all"; // ALL Все тут для того, чтобы города чтобы по умолчанию показалось в шаблоне
  selectedVacancyType = "all"; // ALL тут для того, чтобы Все направления чтобы по умолчанию показалось в шаблоне

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  private filterSubject = new Subject<any>();

  @Output() filterChanged = this.filterSubject.asObservable();

  constructor() { }

  // Используется Пайп от RxJs для быстой фильтрации, для того чтоб поиск был моментальным и не ждать пока юзер закончит писать
  ngAfterViewInit(): void {
    this.searchText.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe((searchText) => {
      this.applyFilter();
    });
  }

  //Уже применяется фльтр также и по городу и типу вакансий
  applyFilter(): void {
    const filterData = {
      searchText: this.searchText.value,
      selectedCity: this.selectedCity,
      selectedVacancyType: this.selectedVacancyType,
    };
    this.filterSubject.next(filterData);
  }
}
