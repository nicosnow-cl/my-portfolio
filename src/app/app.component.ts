import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AboutMeComponent } from './common/about-me/about-me.component';
import { HeroComponent } from './common/hero/hero.component';
import { NavbarComponent } from './common/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HeroComponent, AboutMeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-portfolio';
}
