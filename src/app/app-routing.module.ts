import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {VacancyPageComponent} from './pages/vacancy-page/vacancy-page.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'vacancy/:id', component: VacancyPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
