import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Vacancy} from "../models/vacancy";
import {Comments} from "../models/comments";

@Injectable({
  providedIn: 'root'
})

export class VacancyListService {
  private baseUrl = 'http://localhost:3000/vacancies';
  private CommentUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.baseUrl).pipe(
        tap(vacancies => console.log('Loaded vacancies:', vacancies))
    );
  }

  getComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.CommentUrl).pipe(
      tap(comments => console.log('Loaded comments:', comments))
    );
  }


  getVacancyById(id: number): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.baseUrl}/${id}`);
  }
}

