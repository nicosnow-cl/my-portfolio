import { Component } from '@angular/core';
import { HlmBadgeDirective } from '@spartan-ng/helm/badge';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { lucideArrowRight, lucideArrowUpRight } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { WrapperComponent } from '../../layout/wrapper/wrapper.component';

const GRID_ITEMS_NUMBER = 6;
const PROJECTS = [
  {
    title: 'AI Mentor Hub',
    description: 'Description of project one.',
    imageUrl: `https://picsum.photos/seed/AI Mentor Hub/300/300`,
    linkTitle: 'amh.app',
    link: 'https://amh.app',
  },
  {
    title: 'Bit-land',
    description: 'Description of project two.',
    imageUrl: `https://picsum.photos/seed/Bit-land/300/300`,
    linkTitle: 'bit-land.app',
    link: 'https://bit-land.app',
  },
  {
    title: 'BuscaRut',
    description: 'Description of project three.',
    imageUrl: `https://picsum.photos/seed/BuscaRut/300/300`,
    linkTitle: 'buscarut.cl',
    link: 'https://buscarut.cl',
  },
];

@Component({
  selector: 'portfolio',
  imports: [
    HlmButtonDirective,
    HlmIconDirective,
    NgIcon,
    HlmBadgeDirective,
    WrapperComponent,
  ],
  providers: [provideIcons({ lucideArrowUpRight, lucideArrowRight })],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
  gridItems = Array.from({ length: GRID_ITEMS_NUMBER }, (_, i) => {
    const project = PROJECTS.at(i);

    if (!project) {
      return {
        id: i + 1,
        title: `Placeholder Project ${i + 1}`,
        description: '',
        imageUrl: '',
        linkTitle: '',
        link: '#',
      };
    }

    return {
      id: i + 1,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      linkTitle: project.linkTitle,
      link: project.link,
    };
  });
}
