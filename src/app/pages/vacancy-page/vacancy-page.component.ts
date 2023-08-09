import {Component} from '@angular/core';
import {VacancyListServiceService} from "../../services/vacancy-list-service.service";
import {ActivatedRoute} from "@angular/router";
import {RequestModalComponent} from "../../components/request-modal/request-modal.component";
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-vacancy-page',
    templateUrl: './vacancy-page.component.html',
    styleUrls: ['./vacancy-page.component.css']
})
export class VacancyPageComponent {
    vacancy: any;
    vacancies: any[] = []

    constructor(
      //Вызываем компоненты и сервисы
        private route: ActivatedRoute,
        private vacancyService: VacancyListServiceService,
        public dialog: MatDialog,
    ) { }

  // Происходит инициализация, берется список(объекты из сервиса, где хранятся данные)...
    ngOnInit(): void {
        this.vacancies = this.vacancyService.getVacancies();
        this.route.params.subscribe(params => {
            const vacancyId = +params['id']; // Получаем id вакансии из параметров URL
            this.vacancy = this.vacancyService.getVacancyById(vacancyId); // Используем сервис для получения данных вакансии по id
        });
    }


    // Открытие модального окна
    openModal(vacancy: any): void {
      const minimalVacancyInfo = {
        id: vacancy.id,
        title: vacancy.title,
        city: vacancy.city
      };
      const dialogRef = this.dialog.open(RequestModalComponent, {
        data: { vacancyInfo: minimalVacancyInfo }
      });

      // После успешной или само вольной закрытии модального окна. Чисто для проверки, никакой пользы для Клиента. Просто комментировал пусть останется на всякий случае
      // dialogRef.afterClosed().subscribe((result: any) => {
      //   if (result) {
      //     alert("Ваша заявка принята! Скоро с вами свяжутся наши специалисты!");
      //   } else {
      //     console.log('Модальное окно было закрыто');
      //   }
      // });
    }

}
