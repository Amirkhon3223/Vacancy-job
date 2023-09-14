import {Component, HostListener} from '@angular/core';
import {NavigationProgressService} from "../../services/navigation-progress.service";
import {ThemeServiceService} from "../../services/theme-service.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    public navigationProgressService: NavigationProgressService,
    public themeService: ThemeServiceService,
  ) {
  }

  isMobileMenuOpen: boolean = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    this.navigationProgressService.updateScrollProgress(scrollY, windowHeight, fullHeight);
  }

  protected readonly HostListener = HostListener;
}
