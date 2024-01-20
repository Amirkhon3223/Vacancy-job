import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import axios, { AxiosResponse } from 'axios';
import { Vacancy } from '../models/vacancy';

@Injectable({
  providedIn: 'root',
})
export class VacancyListService {
  private baseUrl = 'http://127.0.0.1:3000/vacancies';

  // Функция для обработки ошибок. Возвращает Observable, который завершается ошибкой.
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  // Получение списка вакансий. Используется Axios для выполнения HTTP-запроса.
  getVacancies(): Observable<Vacancy[]> {
    return new Observable<Vacancy[]>((observer) => {
      // Выполняем GET-запрос с использованием Axios к указанному URL.
      axios.get<Vacancy[]>(this.baseUrl)
        .then((response: AxiosResponse<Vacancy[]>) => {
          // Если запрос успешен, передаем данные наблюдателю.
          observer.next(response.data);
          // Завершаем Observable, так как получение данных завершено.
          observer.complete();
        })
        .catch((error) => {
          // Если произошла ошибка, передаем ее наблюдателю.
          observer.error(error);
          // Завершаем Observable, так как обработка ошибки завершена.
          observer.complete();
        });
    }).pipe(
      // Обрабатываем ошибку с использованием catchError из RxJS.
      catchError((error) => this.handleError(error))
    );
  }

  // Получение вакансии по идентификатору. Используется Axios для выполнения HTTP-запроса.
  getVacancyById(id: number): Observable<Vacancy> {
    return new Observable<Vacancy>((observer) => {
      // Выполняем GET-запрос с использованием Axios к указанному URL с идентификатором.
      axios.get<Vacancy>(`${this.baseUrl}/${id}`)
        .then((response: AxiosResponse<Vacancy>) => {
          // Если запрос успешен, передаем данные наблюдателю.
          observer.next(response.data);
          // Завершаем Observable, так как получение данных завершено.
          observer.complete();
        })
        .catch((error) => {
          // Если произошла ошибка, передаем ее наблюдателю.
          observer.error(error);
          // Завершаем Observable, так как обработка ошибки завершена.
          observer.complete();
        });
    }).pipe(
      // Обрабатываем ошибку с использованием catchError из RxJS.
      catchError((error) => this.handleError(error))
    );
  }
}
