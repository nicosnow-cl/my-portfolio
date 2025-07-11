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

import { AcsiiPortraitComponent } from '@app/common/acsii-portrait/acsii-portrait.component';
import { WrapperComponent } from '@app/layout/wrapper/wrapper.component';

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
      date: 'Aug 2022 - Present',
      companyName: 'Cencosud SA',
      location: 'Santiago, CL',
      position: 'Software Engineer',
      description:
        'Ingeniero de Software enfocado en el desarrollo de soluciones escalables y eficientes. Ha integrado tecnologías innovadoras e IA generativa para potenciar funcionalidades internas. Desde 2025, forma parte del Centro de Excelencia (CoE) en IA de Cencosud.',
      stack: ['JS', 'TS', 'React', 'Next.JS', 'Nest.JS', 'AWS', 'AI'],
    },
    {
      date: 'Mar 2022 - Aug 2022',
      companyName: 'LicitaLab',
      location: 'Santiago, CL',
      position: 'Full Stack Developer',
      description:
        'Desarrollador Full Stack enfocado en optimizar el rendimiento web y crear APIs eficientes para soluciones de scraping. Implementó interfaces responsivas y contribuyó a la expansión del SaaS a clientes en Perú.',
      stack: ['JS', 'TS', 'React', 'Node', 'MongoDB', 'PostgreSQL'],
    },
    {
      date: 'Aug 2021 - Mar 2020',
      companyName: 'AgiBiz',
      location: 'Santiago, CL',
      position: 'Software Analyst',
      description:
        'Analista de Software encargado de la gestión de proyectos, documentación y cumplimiento de plazos. Actuó como enlace con stakeholders y brindó mentoría técnica a desarrolladores junior.',
      stack: ['JS', 'TS', 'Angular', 'Node', 'MongoDB', 'SQL Server'],
    },
    {
      date: 'Mar 2021 - Aug 2021',
      companyName: 'Penta Vida SA',
      location: 'Santiago, CL',
      position: 'Junior Software Developer',
      description:
        'Desarrollador Junior enfocado en la implementación de funcionalidades a medida y soporte técnico oportuno. Mejoró la mantenibilidad del código mediante buenas prácticas y documentación clara.',
      stack: ['JS', 'JQuery', 'Angular', 'C#', '.NET', 'SQL Server'],
    },
  ];
}
