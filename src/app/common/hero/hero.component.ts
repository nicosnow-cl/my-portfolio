import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/helm/button';

import { WrapperComponent } from '../../layout/wrapper/wrapper.component';

@Component({
  selector: 'hero',
  imports: [HlmButtonDirective, WrapperComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {}
