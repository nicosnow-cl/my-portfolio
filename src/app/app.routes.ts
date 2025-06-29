import { Routes } from '@angular/router';

import { AboutMeComponent } from './pages/about-me/about-me.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AboutMeComponent },
      { path: 'about-me', component: AboutMeComponent },
      { path: 'portfolio', component: PortfolioComponent },
    ],
  },
  { path: '**', redirectTo: '' }, // Redirect any unknown paths to the home page
];
