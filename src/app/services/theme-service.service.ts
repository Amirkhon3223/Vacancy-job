import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeServiceService {
  private storageKey = 'isDarkMode';
  public isDarkMode: boolean = true;

  themeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme) {
      this.isDarkMode = savedTheme === "true";
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem(this.storageKey, JSON.stringify(this.isDarkMode));
    this.themeChanged.emit(this.isDarkMode);
  }
}
