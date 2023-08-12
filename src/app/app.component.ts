import { Component } from '@angular/core';
import {ThemeServiceService} from "./services/theme-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'karimovJob';
  constructor(public themeService: ThemeServiceService) {}

}
