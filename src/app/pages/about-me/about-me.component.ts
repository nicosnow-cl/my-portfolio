import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCarouselImports } from '@spartan-ng/helm/carousel';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmTooltip } from '@libs/ui/tooltip/src';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { lucideChevronDown, lucideLinkedin } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { AcsiiPortraitComponent } from '@app/common/acsii-portrait/acsii-portrait.component';
import { TECH_ICON_MAP, TECH_ICONS } from '@app/misc/icons';
import { WrapperComponent } from '@app/layout/wrapper/wrapper.component';
import jobsJSON from '@app/assets/jsons/jobs.json';

@Component({
  selector: 'app-about-me',
  imports: [
    AcsiiPortraitComponent,
    DatePipe,
    HlmAccordionImports,
    HlmBadgeImports,
    HlmButtonImports,
    HlmCardImports,
    HlmCarouselImports,
    HlmTooltipImports,
    HlmIcon,
    NgIcon,
    WrapperComponent,
    HlmTooltip,
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
