import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { lucideArrowDown } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { MaskedContainerComponent } from '@app/common/masked-container/masked-container.component';
import { MosaicComponent } from '@app/common/mosaic/mosaic.component';
import { scrollDown } from '@libs/utils/scroll-down';
import { WrapperComponent } from '../wrapper/wrapper.component';

@Component({
  selector: 'app-hero',
  imports: [
    HlmButtonDirective,
    WrapperComponent,
    MaskedContainerComponent,
    MosaicComponent,
    NgIcon,
  ],
  providers: [provideIcons({ lucideArrowDown })],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  handleScrollDown(): void {
    const routerOutler = document.getElementById('app-main-content');

    scrollDown(routerOutler, -72);
  }
}
