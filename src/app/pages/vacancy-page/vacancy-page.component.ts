import {Component} from '@angular/core';
import {VacancyListService} from "../../services/vacancy-list.service";
import {ActivatedRoute} from "@angular/router";
import {RequestModalComponent} from "../../components/request-modal/request-modal.component";
import {MatDialog} from '@angular/material/dialog';
import {Vacancy} from '../../models/vacancy'
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-vacancy-page',
  templateUrl: './vacancy-page.component.html',
  styleUrls: ['./vacancy-page.component.css']
})

export class VacancyPageComponent {
  vacancy: any;
  constructor(
    private route: ActivatedRoute,
    private vacancyService: VacancyListService,
    public dialog: MatDialog,
    private toast: HotToastService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const vacancyId = +params['id'];
      this.vacancyService.getVacancyById(vacancyId).subscribe(vacancy => {
        this.vacancy = vacancy;
      });
    });
  }

  openModal(): void {
    const minimalVacancyInfo = {
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
