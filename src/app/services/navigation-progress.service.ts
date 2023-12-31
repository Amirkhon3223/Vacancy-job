import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationProgressService {
  percent: number = 0;

  constructor() { }

  // Для красоты анимаци горизонтальной линии Над навигции
  // Метод для обновления значения прогресса скроллинга
  updateScrollProgress(scrollY: number, windowHeight: number, fullHeight: number) {
    this.percent = Math.round((scrollY / (fullHeight - windowHeight)) * 100);
  }
}
