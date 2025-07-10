import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { animate } from 'animejs';

import { FooterComponent } from '../footer/footer.component';
import { HeroComponent } from '../hero/hero.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, NavbarComponent, HeroComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements AfterViewInit {
  private firstLoad = true;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (!this.firstLoad) {
            const element = document.getElementById('app-main-content');

            if (element) {
              animate(element, {
                translateY: [50, 0],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo',
              });
            }
          }

          this.firstLoad = false;
        }
      });
    }
  }
}
