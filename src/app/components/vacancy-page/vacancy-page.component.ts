import {Component} from '@angular/core';
import {VacancyListServiceService} from "../../services/vacancy-list-service.service";
import {ActivatedRoute} from "@angular/router";
import {RequestModalComponent} from "../request-modal/request-modal.component";
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
        private route: ActivatedRoute,
        private vacancyService: VacancyListServiceService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit(): void {
        this.vacancies = this.vacancyService.getVacancies();
        this.route.params.subscribe(params => {
            const vacancyId = +params['id']; // Получаем id вакансии из параметров URL
            this.vacancy = this.vacancyService.getVacancyById(vacancyId); // Используем сервис для получения данных вакансии по id
            this.updateData(vacancyId);
        });
    }

    updateData(vacancyId: number) {
        if (this.vacancies?.length > 0) {
            this.vacancy = this.vacancies.find(vacancy => vacancy.id === vacancyId);
        }
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

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          alert("Ваша заявка принята! Скоро с вами свяжутся наши специалисты!");
        } else {
          console.log('Модальное окно было закрыто без отправки данных');
        }
      });
    }

}
