import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-masked-container',
  imports: [],
  templateUrl: './masked-container.component.html',
  styleUrl: './masked-container.component.css',
})
export class MaskedContainerComponent implements AfterViewInit {
  cursorX = 0;
  cursorY = 0;

  @ViewChild('masked') maskedRef!: ElementRef;

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', this.updateMask.bind(this));
    }
  }

  updateMask(evt: MouseEvent) {
    const rect = this.maskedRef.nativeElement.getBoundingClientRect();

    this.cursorX = evt.clientX - rect.left;
    this.cursorY = evt.clientY - rect.top;
  }
}
