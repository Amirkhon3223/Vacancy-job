import { AfterViewInit, Component } from '@angular/core';
import Swiper from 'swiper/bundle';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  mySwiper!: Swiper;

  constructor() { }



  ngAfterViewInit(): void {
    this.initSwiper();
    // Добавьте прослушивание события изменения размера окна
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
    this.checkScreenWidth();
  }

  initSwiper() {
    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      speed: 500,
      loop: true,
      autoplay: true,
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
    });

  }

  checkScreenWidth() {
    const screenWidth = window.innerWidth;

    // Устанавливаем количество отображаемых слайдов в зависимости от ширины экрана
    if (screenWidth < 768) {
      this.mySwiper.params.slidesPerView = 1; // На мобильных устройствах один слайд
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      this.mySwiper.params.slidesPerView = 2; // На планшетных устройствах два слайда
    } else {
      this.mySwiper.params.slidesPerView = 3; // На широких экранах три слайда
    }

    // Обновляем Swiper после изменения параметров
    this.mySwiper.update();
  }
}
