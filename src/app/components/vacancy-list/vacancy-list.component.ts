import {Component} from '@angular/core';
import {VacancyListServiceService} from "../../services/vacancy-list-service.service";
@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})
export class VacancyListComponent {

  vacancies: any[] = [];
  totalVacancies: number = 0;
  filteredVacancies: any[] = []; // Массив отфильтрованных вакансий

  constructor(
      private vacancyService: VacancyListServiceService,
  ) {}
  ngOnInit(): void {
    this.vacancies = this.vacancyService.getVacancies();
    this.filteredVacancies = [...this.vacancies]; // Изначально отфильтрованный массив будет равен всем вакансиям
    this.totalVacancies = this.filteredVacancies.length;
  }
  // Метод, который будет вызываться при изменении данных фильтрации
  onFilterChanged(filterData: any): void {
    this.applyFilter(filterData);
  }

  // Метод для применения фильтрации
  applyFilter(filterData: any): void {
    const { searchText, selectedCity, selectedVacancyType } = filterData;

    // Применяем фильтрацию по тексту
    this.filteredVacancies = this.vacancies.filter((vacancy) =>
        vacancy.name.toLowerCase().includes(searchText.toLowerCase()) ||
        vacancy.title.toLowerCase().includes(searchText.toLowerCase())
    );

    // Применяем фильтрацию по городу
    if (selectedCity && selectedCity !== 'all') {
      this.filteredVacancies = this.filteredVacancies.filter((vacancy) =>
          vacancy.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    // Применяем фильтрацию по специализации
    if (selectedVacancyType && selectedVacancyType !== 'all') {
      this.filteredVacancies = this.filteredVacancies.filter((vacancy) =>
          vacancy.type.toLowerCase() === selectedVacancyType.toLowerCase()
      );
    }
    this.totalVacancies = this.filteredVacancies.length;
  }

    protected readonly length = length;
}
