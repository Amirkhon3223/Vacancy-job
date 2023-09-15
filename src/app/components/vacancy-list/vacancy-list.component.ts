import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {VacancyListService} from "../../services/vacancy-list.service";
import {Vacancy} from '../../models/vacancy';
import {HotToastService} from "@ngneat/hot-toast";
import {EmailService} from "../../services/email.service";
import {VacancyFilterComponent} from "../vacancy-filter/vacancy-filter.component";
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged} from "rxjs";

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

  selectedCityControl = new FormControl('all');
  selectedVacancyTypeControl = new FormControl('all');
  searchText = new FormControl('');

  constructor(
    private vacancyService: VacancyListService,
    private toast: HotToastService,
    private emailService: EmailService
  ) { }

  // Считает количество вакансий и с соответствием этим создает страницу для пагинации
  calculateTotalPages(): number {
    return Math.ceil(this.filteredVacancies.length / this.vacanciesPerPage);
  }

  // Ну тут уже кнопка для переключения пагинаций
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.calculateTotalPages()) {
      this.currentPage = pageNumber;
      window.scrollTo({top: 500, behavior: 'smooth'}); // Прокручиваем страницу вверх
    }
  }

  // Берет список вакансии из сервиса(где хранятся вакансии)
  ngOnInit(): void {
    this.vacancyService.getVacancies().subscribe((vacancies) => {
      this.vacancies = vacancies;
      this.filteredVacancies = [...this.vacancies]; // Сохраняем оригинальный список
      this.totalVacancies = this.filteredVacancies.length;
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

  truncateDescription(description: string, maxLength: number): string {
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
    return description.slice(0, -1) + '...';
  }

  // Обработчик изменений фильтра по городу
  onCityFilterChanged(event: any): void {
    const selectedCity = event.target.value;
    this.selectedCityControl.setValue(selectedCity); // Устанавливаем значение FormControl для города
    this.applyFilter({selectedCity}); // Применяем фильтр после изменения города
  }

  onVacancyTypeFilterChanged(event: any): void {
    const selectedVacancyType = event.target.value;
    this.selectedVacancyTypeControl.setValue(selectedVacancyType); // Устанавливаем значение FormControl для типа вакансии
    this.applyFilter({selectedVacancyType}); // Применяем фильтр после изменения типа вакансии
  }

  // Метод, который будет вызываться при изменении данных фильтрации
  applyFilter(filterData: any): void {
    const selectedCity = this.selectedCityControl.value;
    const selectedVacancyType = this.selectedVacancyTypeControl.value;
    const searchText = filterData.searchText; // Используйте переданный текст поиска

    let filteredByCity = this.vacancies;
    let filteredByVacancyType = this.vacancies;

    if (selectedCity && selectedCity !== 'all') {
      filteredByCity = this.vacancies.filter((vacancy) =>
        vacancy.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    if (selectedVacancyType && selectedVacancyType !== 'all') {
      filteredByVacancyType = this.vacancies.filter((vacancy) =>
        vacancy.type.toLowerCase() === selectedVacancyType.toLowerCase()
      );
    }

    if (searchText) {
      // Фильтрация по тексту поиска
      filteredByCity = filteredByCity.filter((vacancy) =>
        vacancy.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Объединяем результаты всех фильтров
    this.filteredVacancies = filteredByCity.filter((vacancy) =>
      filteredByVacancyType.includes(vacancy)
    );

    this.totalVacancies = this.filteredVacancies.length;
    this.currentPage = 1;
  }




  // TOAST Text
  copyVacancyLink(vacancyId: number): void {
    const vacancyLink = `${window.location.origin}/vacancy/${vacancyId}`;
    navigator.clipboard.writeText(vacancyLink).then(() => {
      this.toast.success('Ссылка скопирована')
    }).catch((error) => {
      this.toast.show("Ошибка при копировании ссылки: ", error);
    });
  }

  // Метод для оформления подписки
  userEmail: string = ''; // Переменная для хранения введенной почты
  subscribe(email: string): void {
    this.emailService.subscribe(email).subscribe(
      () => {
        this.toast.success("Подписка успешно оформлена!")
      },
      (error) => {
        this.toast.warning('Произошла ошибка при оформлении подписки')
      }
    );
  }

  protected readonly event = event;
  protected readonly getSelection = getSelection;
  protected readonly unescape = unescape;
}
