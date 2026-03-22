import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { lucideGithub, lucideLinkedin, lucideYoutube } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { RouteTransitionService } from '@app/services/route-transition.service';

import { scrollDown } from '@libs/utils';

@Component({
  selector: 'app-navbar',
  imports: [HlmButton, HlmDropdownMenuImports, NgIcon],
  providers: [provideIcons({ lucideGithub, lucideLinkedin, lucideYoutube })],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements AfterViewInit {
  navbarItems = [
    {
      name: 'Sobre mi',
      link: '/about-me',
      disabled: false,
    },
    {
      name: 'Portafolio',
      link: '/portfolio',
      disabled: false,
    },
    {
      name: 'Blog',
      link: '/blog',
      disabled: true,
    },
  ];

  socialMediaItems = [
    {
      name: 'GitHub',
      link: 'https://github.com/nicosnow-cl/',
      icon: 'lucideGithub',
    },
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/nicofrias-snow/',
      icon: 'lucideLinkedin',
    },
    {
      name: 'Youtube',
      link: 'https://www.youtube.com/nicosnow-cl',
      icon: 'lucideYoutube',
    },
  ];

  @ViewChild('navbar') navbarElement!: ElementRef<HTMLDivElement>;

  constructor(private transitionService: RouteTransitionService) {}

  goTo(path: string) {
    this.transitionService.navigate(path).finally(() => {
      setTimeout(() => {
        this.handleScrollDown();
      }, 500);
    });
  }

  ngAfterViewInit(): void {
    // This method is intentionally left empty.
    // It can be used for any initialization logic after the view has been initialized.

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        if (!this.navbarElement) return;

        if (window.scrollY > 0) {
          this.navbarElement.nativeElement.classList.add(
            'bg-foreground/15',
            'glass',
          );
        } else {
          this.navbarElement.nativeElement.classList.remove(
            'bg-foreground/15',
            'glass',
          );
        }
      });
    }
  }

  handleScrollDown(): void {
    const routerOutler = document.getElementById('app-main-content');

    scrollDown(routerOutler, -72);
  }
}
