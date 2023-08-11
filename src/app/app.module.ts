import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {NavbarComponent} from './sharePages/navbar/navbar.component';
import {FooterComponent} from './sharePages/footer/footer.component';
import {VacancyListComponent} from './components/vacancy-list/vacancy-list.component';
import {VacancyPageComponent} from './pages/vacancy-page/vacancy-page.component';
import {VacancyListService} from "./services/vacancy-list.service";
import {VacancyFilterComponent} from './components/vacancy-filter/vacancy-filter.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ThemeServiceService} from "./services/theme-service.service";
import {RequestModalComponent} from './components/request-modal/request-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorage, AngularFireStorageModule} from "@angular/fire/compat/storage";
import {HttpClientModule} from "@angular/common/http";
import {PaginationComponent} from './components/pagination/pagination.component';
import {MarkdownModule} from "ngx-markdown";
import { ContentHeadingComponent } from './components/content-heading/content-heading.component';
import { ContentListComponent } from './components/content-list/content-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    VacancyListComponent,
    VacancyPageComponent,
    VacancyFilterComponent,
    RequestModalComponent,
    PaginationComponent,
    ContentHeadingComponent,
    ContentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MarkdownModule.forRoot(),
    HttpClientModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    // Не забудьте добавить этот модуль
  ],
  providers: [
    HttpClientModule,
    AngularFireStorage,
    VacancyListService,
    ThemeServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

