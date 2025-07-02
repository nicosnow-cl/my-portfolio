import { animate, AnimatableObject } from 'animejs';
import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { throttle } from 'lodash';

const ROWS = 30;
const COLUMNS = 30;

@Component({
  selector: 'app-mosaic',
  imports: [],
  templateUrl: './mosaic.component.html',
  styleUrl: './mosaic.component.css',
})
export class MosaicComponent implements AfterViewInit {
  mosaics: { id: string }[] = [];
  columns = COLUMNS;
  rows = ROWS;
  baseScale = 0.3;
  animatables: AnimatableObject | null = null;
  hoverIndex = 0;
  private mosaicNodes: HTMLElement[] = [];
  private pendingFrame = false;
  private animationFrameId: number | null = null;
  private lastIndex = -1;
  private pendingMouseX = 0;
  private pendingMouseY = 0;

  throttledMouseOver: (event: MouseEvent) => void;

  @ViewChild('mosaicGrid', { static: true })
  mosaicGrid!: ElementRef<HTMLDivElement>;
  @ViewChildren('mosaicElem', { read: ElementRef }) mosaicElems!: QueryList<
    ElementRef<HTMLElement>
  >;

  constructor() {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        this.mosaics.push({ id: `${i}-${j}` });
      }
    }

    this.throttledMouseOver = throttle(
      (event: MouseEvent) => this.onMouseMove(event),
      150,
      { leading: true, trailing: false }
    );
  }

  ngAfterViewInit(): void {
    this.mosaicNodes = this.mosaicElems.toArray().map((el) => el.nativeElement);
  }

  onMouseMove(event: MouseEvent) {
    this.pendingMouseX = event.clientX;
    this.pendingMouseY = event.clientY;

    if (this.pendingFrame) return;

    this.pendingFrame = true;

    this.animationFrameId = requestAnimationFrame(() => {
      this.handleWaveEffect(this.pendingMouseX, this.pendingMouseY);
      this.pendingFrame = false;
    });
  }

  handleWaveEffect(clientX: number, clientY: number) {
    const gridEl = this.mosaicGrid.nativeElement;
    const gridRect = gridEl.getBoundingClientRect();

    const mouseX = clientX - gridRect.left;
    const mouseY = clientY - gridRect.top;

    const cellWidth = gridRect.width / this.columns;
    const cellHeight = gridRect.height / this.rows;

    const col = Math.floor(mouseX / cellWidth);
    const row = Math.floor(mouseY / cellHeight);
    const index = row * this.columns + col;

    if (index === this.lastIndex || index < 0 || index >= this.mosaics.length)
      return;
    this.lastIndex = index;

    const centerX = gridRect.width / 2;
    const centerY = gridRect.height / 2;

    const baseDelay = 30;
    const maxDistance = 5;
    const pullFactor = 0.15;
    const baseScale = this.baseScale;

    const all = this.mosaicNodes;

    all.forEach((el) => {
      const idx = Number((el.dataset as { index: string }).index);

      if (isNaN(idx)) return;

      const cellCol = idx % this.columns;
      const cellRow = Math.floor(idx / this.columns);

      const dx = cellCol - col;
      const dy = cellRow - row;
      const distance = Math.hypot(dx, dy);

      if (distance <= maxDistance) {
        const distanceFactor = 1 - distance / maxDistance;

        const cellCenterX = (cellCol + 0.5) * cellWidth;
        const cellCenterY = (cellRow + 0.5) * cellHeight;

        const deltaX = (centerX - cellCenterX) * pullFactor * distanceFactor;
        const deltaY = (centerY - cellCenterY) * pullFactor * distanceFactor;

        const scale = baseScale + distance * 0.1;

        animate(el, {
          transform: `translate(${deltaX}px, ${deltaY}px) scale(${scale})`,
          delay: distance * baseDelay,
          duration: 300,
          easing: 'easeOutSine',
        });
      } else {
        animate(el, {
          transform: 'translate(0, 0) scale(1)',
          delay: 50,
          duration: 600,
          easing: 'easeOutSine',
        });
      }
    });
  }
}
