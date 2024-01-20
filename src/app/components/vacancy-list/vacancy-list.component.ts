import {Component} from '@angular/core';
import {VacancyListService} from "../../services/vacancy-list.service";
import {FilterData, Vacancy} from '../../models/vacancy';
import {HotToastService} from "@ngneat/hot-toast";
import {EmailService} from "../../services/email.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})
export class VacancyListComponent {
  vacancies: Vacancy[] = [];
  totalVacancies: number = 0;
  filteredVacancies: Vacancy[] = [];
  currentPage: number = 1;
  vacanciesPerPage: number = 5;

  selectedCityControl = new FormControl('all');
  selectedVacancyTypeControl = new FormControl('all');
  searchText = new FormControl('');

  constructor(
    private vacancyService: VacancyListService,
    private toast: HotToastService,
    private emailService: EmailService
  ) {
  }

  // Считаем количество вакансий и с соответствием этим создает страницу для пагинации
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
    if (endIndex > this.filteredVacancies.length) {
      return this.filteredVacancies.slice(startIndex); // endIndex, чтобы не выходить за границы массива
    }
    return this.filteredVacancies.slice(startIndex, endIndex);
  }

  // Обработчик изменений фильтра по городу
  onCityFilterChanged(event: any): void {
    const selectedCity = event.target.value;
    this.selectedCityControl.setValue(selectedCity);
    this.applyFilter({selectedCity});
  }

  onVacancyTypeFilterChanged(event: any): void {
    const selectedVacancyType = event.target.value;
    this.selectedVacancyTypeControl.setValue(selectedVacancyType);
    this.applyFilter({selectedVacancyType});
  }

  // Метод, который будет вызываться при изменении данных фильтрации
  applyFilter(filterData: FilterData): void {
    const selectedCity = this.selectedCityControl.value;
    const selectedVacancyType = this.selectedVacancyTypeControl.value;
    const searchText = filterData.searchText;

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

}
