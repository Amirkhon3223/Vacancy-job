import {Component} from '@angular/core';
import {VacancyListService} from "../../services/vacancy-list.service";
import {ActivatedRoute} from "@angular/router";
import {RequestModalComponent} from "../../components/request-modal/request-modal.component";
import {MatDialog} from '@angular/material/dialog';
import {Vacancy} from '../../models/vacancy'

@Component({
  selector: 'app-vacancy-page',
  templateUrl: './vacancy-page.component.html',
  styleUrls: ['./vacancy-page.component.css']
})
export class VacancyPageComponent {
  vacancy: any;
  vacancies: Vacancy[] = []

  constructor(
    //Вызываем компоненты и сервисы
    private route: ActivatedRoute,
    private vacancyService: VacancyListService,
    public dialog: MatDialog,
  ) {
  }

  // Происходит инициализация, берется список(объекты из сервиса, где хранятся данные)...
  ngOnInit(): void {
    this.vacancyService.getVacancies().subscribe(vacancies => {
      this.vacancies = vacancies;
    });
    this.route.params.subscribe(params => {
      const vacancyId = +params['id'];
      this.vacancyService.getVacancyById(vacancyId).subscribe(vacancy => {
        this.vacancy = vacancy;
      });
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
      data: {vacancyInfo: minimalVacancyInfo}
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
