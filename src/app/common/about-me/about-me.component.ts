import { Component } from '@angular/core';
import { HlmBadgeDirective } from '@spartan-ng/helm/badge';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';

@Component({
  selector: 'about-me',
  imports: [
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmBadgeDirective,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent {
  jobs = [
    {
      date: 'August 2022 - Present',
      companyName: 'Cencosud SA',
      location: 'Santiago, Chile',
      position: 'Senior Software Engineer',
      description: 'Lorem ipsum bien chiquito',
      stack: ['JS', 'TS', 'AI'],
    },
    {
      date: 'January 2021 - July 2022',
      companyName: 'Cencosud SA',
      location: 'Santiago, Chile',
      position: 'Software Engineer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      stack: ['JS', 'TS', 'AI'],
    },
    {
      date: 'January 2019 - December 2020',
      companyName: 'Cencosud SA',
      location: 'Santiago, Chile',
      position: 'Junior Software Engineer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      stack: ['JS', 'TS', 'AI'],
    },
  ];
}
