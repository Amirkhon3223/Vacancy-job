import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Vacancy} from "../models/vacancy";

@Injectable({
  providedIn: 'root'
})

export class VacancyListService {
  private baseUrl = 'http://localhost:3000/vacancies';

  constructor(private http: HttpClient) {}

  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.baseUrl).pipe(
        tap(vacancies => console.log('Loaded vacancies:', vacancies))
    );
  }


  getVacancyById(id: number): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.baseUrl}/${id}`);
  }
}

