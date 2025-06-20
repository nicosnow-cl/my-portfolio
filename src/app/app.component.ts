import { Component } from '@angular/core';

import { AboutMeComponent } from './common/about-me/about-me.component';
import { HeroComponent } from './common/hero/hero.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { PortfolioComponent } from './common/portfolio/portfolio.component';
import { FooterComponent } from './common/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutMeComponent,
    PortfolioComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-portfolio';
}
