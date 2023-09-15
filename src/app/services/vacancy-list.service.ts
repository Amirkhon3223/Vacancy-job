import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
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
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }
  getVacancyById(id: number): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.baseUrl}/${id}`);
  }
}

