import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteTransitionService } from '@app/services/route-transition.service';
import { HlmButtonDirective } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, HlmButtonDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements AfterViewInit {
  navbarItems = [
    {
      name: 'Aboute me',
      link: '/about-me',
    },
    {
      name: 'Portfolio',
      link: '/portfolio',
    },
    {
      name: 'Blog',
      link: '/blog',
      disabled: true,
    },
  ];

  @ViewChild('navbar') navbarElement!: ElementRef<HTMLDivElement>;

  constructor(private transitionService: RouteTransitionService) {}

  goTo(path: string) {
    this.transitionService.navigate(path);
  }

  ngAfterViewInit(): void {
    // This method is intentionally left empty.
    // It can be used for any initialization logic after the view has been initialized.

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        if (!this.navbarElement) return;

        if (window.scrollY > 0) {
          this.navbarElement.nativeElement.classList.add(
            'bg-accent/70',
            'glass'
          );
        } else {
          this.navbarElement.nativeElement.classList.remove(
            'bg-accent/70',
            'glass'
          );
        }
      });
    }
  }
}
