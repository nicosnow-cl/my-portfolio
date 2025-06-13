import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/helm/button';

const GRID_ITEMS_NUMBER = 6;
const PROJECTS = [
  {
    title: 'AI Mentor Hub',
    description: 'Description of project one.',
    imageUrl: `https://picsum.photos/seed/${Math.random()}/300/300`,
    link: 'https://example.com/project-one',
  },
  {
    title: 'Bit-land',
    description: 'Description of project two.',
    imageUrl: `https://picsum.photos/seed/${Math.random()}/300/300`,
    link: 'https://example.com/project-two',
  },
  {
    title: 'BuscaRut',
    description: 'Description of project three.',
    imageUrl: `https://picsum.photos/seed/${Math.random()}/300/300`,
    link: 'https://example.com/project-three',
  },
];

@Component({
  selector: 'portfolio',
  imports: [HlmButtonDirective],
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
        link: '#',
      };
    }

    return {
      id: i + 1,
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      link: project.link,
    };
  });

  setItemActive(index: number) {
    console.log(`Item ${index + 1} clicked`);
  }
}
