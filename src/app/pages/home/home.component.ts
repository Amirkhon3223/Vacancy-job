import {Component, OnInit} from '@angular/core';
import { VacancyListService } from '../../services/vacancy-list.service';
import {Comments} from "../../models/comments";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // comments: Comments[] = [];
  //
  // constructor(private vacancyService: VacancyListService) { }
  //
  // ngOnInit(): void {
  //   this.vacancyService.getComments().subscribe((comments) => {
  //     this.comments = comments;
  //   })
  // }

}
