import { Component } from '@angular/core';
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
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/helm/card';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { lucideChevronDown, lucideLinkedin } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { AcsiiPortraitComponent } from '@app/common/acsii-portrait/acsii-portrait.component';
import { WrapperComponent } from '@app/layout/wrapper/wrapper.component';

@Component({
  selector: 'app-about-me',
  imports: [
    HlmAccordionContentComponent,
    HlmAccordionDirective,
    HlmAccordionIconDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmBadgeDirective,
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmIconDirective,
    WrapperComponent,
    AcsiiPortraitComponent,
    NgIcon,
  ],
  providers: [provideIcons({ lucideChevronDown, lucideLinkedin })],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
})
export class AboutMeComponent {
  jobs = [
    {
      date: 'Ago 2022 - Presente',
      companyName: 'Cencosud SA',
      location: 'Chile',
      position: 'Software Engineer',
      description:
        'Ingeniero de Software enfocado en el desarrollo de soluciones escalables y eficientes. Ha integrado tecnologías innovadoras e IA generativa para potenciar funcionalidades internas. Desde 2025, forma parte del Centro de Excelencia (CoE) en IA de Cencosud.',
      stack: ['React', 'Next.JS', 'Nest.JS', 'Python', 'AWS', 'AI'],
    },
    {
      date: 'Mar 2022 - Ago 2022',
      companyName: 'LicitaLab',
      location: 'Chile',
      position: 'Full Stack Developer',
      description:
        'Desarrollador Full Stack enfocado en optimizar el rendimiento web y crear APIs eficientes para soluciones de scraping. Implementó interfaces responsivas y contribuyó a la expansión del SaaS a clientes en Perú.',
      stack: ['React', 'Node', 'MongoDB', 'PostgreSQL'],
    },
    {
      date: 'Ago 2021 - Mar 2020',
      companyName: 'AgiBiz',
      location: 'Chile',
      position: 'Software Analyst',
      description:
        'Analista de Software encargado de la gestión de proyectos, documentación y cumplimiento de plazos. Actuó como enlace con stakeholders y brindó mentoría técnica a desarrolladores junior.',
      stack: ['TS', 'Angular', 'Node', 'MongoDB', 'SQL Server'],
    },
    {
      date: 'Mar 2021 - Ago 2021',
      companyName: 'Penta Vida SA',
      location: 'Chile',
      position: 'Junior Software Developer',
      description:
        'Desarrollador Junior enfocado en la implementación de funcionalidades a medida y soporte técnico oportuno. Mejoró la mantenibilidad del código mediante buenas prácticas y documentación clara.',
      stack: ['JQuery', 'Angular', 'C#', '.NET', 'SQL Server'],
    },
  ];

  linkedinURL = 'https://www.linkedin.com/in/nicofrias-snow/';
}
