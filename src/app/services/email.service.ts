import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {}
  subscribe(email: string): Observable<any> {
    const url = 'http://localhost:5000/subscribe'; // URL вашего сервера
    const body = { email }; // Данные для запроса

    return this.http.post(url, body); // Отправка запроса на сервер
  }

}
