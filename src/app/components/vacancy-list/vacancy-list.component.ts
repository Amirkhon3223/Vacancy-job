import {Component} from '@angular/core';
import {VacancyListService} from "../../services/vacancy-list.service";
import { Vacancy } from '../../models/vacancy';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})
export class VacancyListComponent {

  vacancies: Vacancy[] = []; // интерфейс Vacancy
  totalVacancies: number = 0;
  filteredVacancies: Vacancy[] = [];
  currentPage: number = 1;  // Текущая страница
  vacanciesPerPage: number = 5; // Количество вакансий на странице


  constructor(private vacancyService: VacancyListService) { }

  // Считает количество вакансий и с соответствием этим создает страницу для пагинации
  calculateTotalPages(): number {
    return Math.ceil(this.filteredVacancies.length / this.vacanciesPerPage);
  }

  // Ну тут уже кнопка для переключения пагинаций
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.calculateTotalPages()) {
      this.currentPage = pageNumber;
    }
  }

  // Берет список вакансии из сервиса(где хранятся вакансии)
  ngOnInit(): void {
    this.vacancyService.getVacancies().subscribe((vacancies) => {
      this.vacancies = vacancies;
      this.filteredVacancies = [...this.vacancies]; // Сохраняем оригинальный список
      this.totalVacancies = this.filteredVacancies.length;

      console.log(this.filteredVacancies);
    });
  }

  // Добавляет список в конкретную страницу (опять такие для пагинации)
  getVacanciesForCurrentPage(): Vacancy[] {
    const startIndex = (this.currentPage - 1) * this.vacanciesPerPage;
    const endIndex = startIndex + this.vacanciesPerPage;

    // Проверяем, что endIndex не превышает размера массива
    if (endIndex > this.filteredVacancies.length) {
      return this.filteredVacancies.slice(startIndex); // Без endIndex, чтобы не выходить за границы массива
    }

    return this.filteredVacancies.slice(startIndex, endIndex);
  }

  truncateDescription(description: any, maxLength: number): string {
    if (description.length > maxLength) {
      let truncated = description.slice(0, maxLength);
      const lastChar = truncated[truncated.length - 1];
      // Проверяем, является ли последний символ буквой
      if (!/[a-zA-Z]/.test(lastChar)) {
        truncated = truncated.slice(0, -1) // Удаляем последний символ, который не является буквой
        truncated = truncated.replace(/\s+$/, ''); // Удаляем пробельные символы перед многоточием, если есть
      }
      return truncated + '...';
    }
    return description.slice(0,-1) + '...';
  }

  onFilterChanged(filteredVacancies: Vacancy[]): void {
    this.filteredVacancies = filteredVacancies; // Присвоить новый массив
    this.totalVacancies = this.filteredVacancies.length;
    this.currentPage = 1;
    console.log(filteredVacancies);
  }

  // Обработчик изменений фильтра по городу
  onCityFilterChanged(selectedCity: string): void {
    this.applyFilter({ selectedCity });
  }

  onVacancyTypeFilterChanged(selectedVacancyType: string): void {
    this.applyFilter({ selectedVacancyType });
  }

  // Метод, который будет вызываться при изменении данных фильтрации
  applyFilter(filterData: any): void {
    const { searchText, selectedCity, selectedVacancyType } = filterData;

    this.filteredVacancies = this.vacancies.filter((vacancy) =>
        vacancy.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (selectedCity && selectedCity !== 'all') {
      this.filteredVacancies = this.filteredVacancies.filter((vacancy) =>
          vacancy.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    if (selectedVacancyType && selectedVacancyType !== 'all') {
      this.filteredVacancies = this.filteredVacancies.filter((vacancy) =>
          vacancy.type.toLowerCase() === selectedVacancyType.toLowerCase()
      );
    }

    this.totalVacancies = this.filteredVacancies.length;
    this.currentPage = 1;
  }

  copyVacancyLink(vacancyId: number): void {
    const vacancyLink = `${window.location.origin}/vacancy/${vacancyId}`;
    navigator.clipboard.writeText(vacancyLink).then(() => {
      alert('Ссылка на вакансию скопирована: ' + vacancyLink);
    }).catch((error) => {
      console.error('Ошибка при копировании ссылки: ', error);
    });
  }


}
