import {Component} from '@angular/core';
import {VacancyListService} from "../../services/vacancy-list.service";
import {ActivatedRoute} from "@angular/router";
import {RequestModalComponent} from "../../components/request-modal/request-modal.component";
import {MatDialog} from '@angular/material/dialog';
import {Vacancy} from '../../models/vacancy'
import {AppComponent} from "../../app.component";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-vacancy-page',
  templateUrl: './vacancy-page.component.html',
  styleUrls: ['./vacancy-page.component.css']
})

export class VacancyPageComponent {
  vacancy: any;
  vacancies: Vacancy[] = []
  headings: string[] = [];
  paragraphs: string[] = [];
  lists: string[][] = [];

  constructor(
    //Вызываем компоненты и сервисы
    private route: ActivatedRoute,
    private vacancyService: VacancyListService,
    public dialog: MatDialog,
    private toast: HotToastService
  ) {
  }

  // Происходит инициализация, берется список(объекты из сервиса, где хранятся данные)...
  ngOnInit(): void {
    this.vacancyService.getVacancies().subscribe(vacancies => {
      this.vacancies = vacancies;

      this.vacancies.forEach(item => {
        this.headings = []; // Очищаем массив перед обработкой каждой вакансии
        this.paragraphs = []; // Очищаем массив перед обработкой каждой вакансии
        this.lists = []; // Очищаем массив перед обработкой каждой вакансии

        if (item.type === 'heading') {
          this.headings.push(item.description);
        } else if (item.type === 'paragraph') {
          this.paragraphs.push(item.description);
        } else if (item.type === 'list') {
          this.lists.push(item.description.split('\n')); // Предполагается, что пункты разделены символом новой строки
        }
      });
    });
    this.route.params.subscribe(params => {
      const vacancyId = +params['id'];
      this.vacancyService.getVacancyById(vacancyId).subscribe(vacancy => {
        this.vacancy = vacancy;
      });
    });
  }


  // Открытие модального окна
  openModal(): void {
    const minimalVacancyInfo = {
      id: this.vacancy.id,
      title: this.vacancy.title,
      city: this.vacancy.city
    };
    const dialogRef = this.dialog.open(RequestModalComponent, {
      data: {vacancyInfo: minimalVacancyInfo}
    });
  }

  copyVacancyLink(vacancyId: number): void {
    const vacancyLink = `${window.location.origin}/vacancy/${vacancyId}`;
    navigator.clipboard.writeText(vacancyLink).then(() => {
      this.toast.success('Ссылка скопирована')
    }).catch((error) => {
      this.toast.show("Ошибка при копировании ссылки: ", error);
    });
  }

}
