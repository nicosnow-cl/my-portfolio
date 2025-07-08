import { Component } from '@angular/core';
import { HlmBadgeDirective } from '@spartan-ng/helm/badge';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';

import { WrapperComponent } from '../../layout/wrapper/wrapper.component';
import { AcsiiPortraitComponent } from '../../common/acsii-portrait/acsii-portrait.component';

@Component({
  selector: 'app-about-me',
  imports: [
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmBadgeDirective,
    WrapperComponent,
    AcsiiPortraitComponent,
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent {
  jobs = [
    {
      date: 'August 2022 - Present',
      companyName: 'Cencosud SA',
      location: 'Santiago, CL',
      position: 'Senior Software Engineer',
      description: 'Lorem ipsum bien chiquito',
      stack: ['JS', 'TS', 'AI'],
    },
    {
      date: 'January 2021 - July 2022',
      companyName: 'Cencosud SA',
      location: 'Santiago, CL',
      position: 'Software Engineer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      stack: ['JS', 'TS', 'AI'],
    },
    {
      date: 'January 2019 - December 2020',
      companyName: 'Cencosud SA',
      location: 'Santiago, CL',
      position: 'Junior Software Engineer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      stack: ['JS', 'TS', 'AI'],
    },
  ];
}
