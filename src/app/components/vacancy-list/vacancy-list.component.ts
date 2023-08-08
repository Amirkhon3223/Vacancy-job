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
    // Массив отфильтрованных вакансий
    filteredVacancies: any[] = [];
    currentPage: number = 1;
    // Текущая страница

    vacanciesPerPage: number = 5;

    // Количество вакансий на странице
    constructor(
        private vacancyService: VacancyListServiceService,
    ) {
    }

    calculateTotalPages(): number {
        return Math.ceil(this.filteredVacancies.length / this.vacanciesPerPage);
    }

    goToPage(pageNumber: number): void {
        if (pageNumber >= 1 && pageNumber <= this.calculateTotalPages()) {
            this.currentPage = pageNumber;
        }
    }

    getVacanciesForCurrentPage(): any[] {
        const startIndex = (this.currentPage - 1) * this.vacanciesPerPage;
        const endIndex = startIndex + this.vacanciesPerPage;
        return this.filteredVacancies.slice(startIndex, endIndex);
    }

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

        // Обновляем количество вакансий на текущей странице
        this.totalVacancies = this.filteredVacancies.length;

        // Устанавливаем текущую страницу в 1 при применении фильтрации
        this.currentPage = 1;
    }

    protected readonly length = length;
}
