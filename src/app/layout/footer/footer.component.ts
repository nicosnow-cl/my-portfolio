import { Component } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { WrapperComponent } from '../../layout/wrapper/wrapper.component';

@Component({
  selector: 'app-footer',
  imports: [HlmButton, WrapperComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
