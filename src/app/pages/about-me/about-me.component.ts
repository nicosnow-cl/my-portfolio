import { Component } from '@angular/core';
import { HlmCarouselImports } from '@spartan-ng/helm/carousel';
import {
  HlmAccordionContentComponent,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/helm/accordion';
import { HlmBadgeDirective } from '@spartan-ng/helm/badge';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import {
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { lucideChevronDown, lucideLinkedin } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { DatePipe } from '@angular/common';

import { AcsiiPortraitComponent } from '@app/common/acsii-portrait/acsii-portrait.component';
import { WrapperComponent } from '@app/layout/wrapper/wrapper.component';
import jobsJSON from '@app/assets/jsons/jobs.json';
import { TECH_ICON_MAP, TECH_ICONS } from '@app/misc/icons';

@Component({
  selector: 'app-about-me',
  imports: [
    DatePipe,
    HlmAccordionContentComponent,
    HlmAccordionDirective,
    HlmAccordionIconDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmBadgeDirective,
    HlmButtonDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmIconDirective,
    WrapperComponent,
    AcsiiPortraitComponent,
    NgIcon,
    HlmCarouselImports,
  ],
  providers: [
    provideIcons({ lucideChevronDown, lucideLinkedin, ...TECH_ICONS }),
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent {
  jobs: any = jobsJSON;
  linkedinURL = 'https://www.linkedin.com/in/nicofrias-snow/';
  iconsMap = TECH_ICON_MAP;

  getIcon(iconName: string) {
    const key = iconName.toLowerCase() as keyof typeof this.iconsMap;

    return this.iconsMap[key];
  }
}
