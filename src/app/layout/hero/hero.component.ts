import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/helm/button';

import { MaskedContainerComponent } from '../../common/masked-container/masked-container.component';
import { MosaicComponent } from '../../common/mosaic/mosaic.component';
import { WrapperComponent } from '../../layout/wrapper/wrapper.component';

@Component({
  selector: 'app-hero',
  imports: [
    HlmButtonDirective,
    WrapperComponent,
    MaskedContainerComponent,
    MosaicComponent,
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {}
