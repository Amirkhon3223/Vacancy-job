import {AfterViewInit, Component} from '@angular/core';
import Swiper from "swiper/bundle";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  constructor() {}
  ngAfterViewInit(): void {
    const mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      speed: 500,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
