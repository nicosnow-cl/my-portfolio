import {
  animate,
  stagger,
  AnimatableObject,
  TargetsParam,
  utils,
} from 'animejs';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { throttle } from 'lodash';

const ROWS = 20;
const COLUMNS = 20;

@Component({
  selector: 'app-mosaic',
  imports: [],
  templateUrl: './mosaic.component.html',
  styleUrl: './mosaic.component.css',
})
export class MosaicComponent {
  mosaics: { id: string }[] = [];
  columns = COLUMNS;
  rows = ROWS;
  baseScale = 0.3;
  animatables: AnimatableObject | null = null;
  hoverIndex = 0;
  private animationFrameId: number | null = null;
  private lastIndex = -1;

  throttledMouseOver: (event: MouseEvent, idx: number) => void;
  @ViewChild('mosaicGrid', { static: true })
  mosaicGrid!: ElementRef<HTMLDivElement>;

  constructor() {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        this.mosaics.push({ id: `${i}-${j}` });
      }
    }

    this.throttledMouseOver = throttle(
      (event: MouseEvent, idx: number) => this.onMosaicMouseOver(event, idx),
      0,
      { leading: true, trailing: false }
    );
  }

  getCircularSiblings(id: string, dimension = 3) {
    const circularSiblings: {
      ids: string[];
      scale: number;
    }[] = []; // Array to hold the circular siblings grouped by dimension
    const [row, col] = id.split('-').map(Number);

    for (let d = 1; d <= dimension; d++) {
      const currentSiblings: { ids: string[]; scale: number } = {
        ids: [],
        scale: 0.3 + (d - 1) * 0.1, // Scale based on the distance,
      };

      for (let i = -d; i <= d; i++) {
        for (let j = -d; j <= d; j++) {
          if (Math.abs(i) + Math.abs(j) === d) {
            const newRow = row + i;
            const newCol = col + j;

            if (
              newRow >= 0 &&
              newRow < ROWS &&
              newCol >= 0 &&
              newCol < COLUMNS
            ) {
              currentSiblings.ids.push(`${newRow}-${newCol}`);
            }
          }
        }
      }
      circularSiblings.push(currentSiblings);
    }

    circularSiblings.reverse();

    return circularSiblings;
  }

  getCircularSiblingsByIndex(index: number, dimension = 3): number[] {
    const circularSiblings: number[] = []; // Array to hold the circular siblings grouped by dimension
    const row = Math.floor(index / this.columns);
    const col = index % this.columns;

    for (let d = 1; d <= dimension; d++) {
      for (let i = -d; i <= d; i++) {
        for (let j = -d; j <= d; j++) {
          if (Math.abs(i) + Math.abs(j) === d) {
            const newRow = row + i;
            const newCol = col + j;

            if (
              newRow >= 0 &&
              newRow < ROWS &&
              newCol >= 0 &&
              newCol < this.columns
            ) {
              const newIndex = newRow * this.columns + newCol;
              if (!circularSiblings.includes(newIndex)) {
                circularSiblings.push(newIndex);
              }
            }
          }
        }
      }
    }

    circularSiblings.reverse();
    return circularSiblings;
  }

  animageWaveEffect(index: number) {
    animate('.mosaic-elem', {
      scale: 1,
      duration: 50,
      easing: 'easeInOutQuad',
      onComplete: () => {
        animate('.mosaic-elem', {
          scale: 0.5,
          translateY: -15,
          opacity: 0.5,
          delay: stagger(50, {
            grid: [this.columns, ROWS],
            from: index,
            start: 1,
          }),
        });
      },
    });
  }

  onMosaicMouseOver(event: MouseEvent, index: number) {
    const circularSiblings = this.getCircularSiblingsByIndex(index, 4);

    // Todos los mosaicos posibles
    const allMosaicSelector = '.mosaic-elem[data-index]';

    // Construyes el selector de los que SÍ quieres animar
    const animateSelector = [index, ...circularSiblings]
      .map((idx) => `[data-index="${idx}"]`)
      .join(', ');

    // Ahora generas el selector para los que NO quieres animar
    const notAnimateSelector = circularSiblings.length
      ? `.mosaic-elem:not(${circularSiblings
          .map((idx) => `[data-index="${idx}"]`)
          .join('):not(')})`
      : allMosaicSelector; // Si está vacío, no excluyas nada

    animate(notAnimateSelector, {
      scale: 1,
      translateY: 0,
      // opacity: 1,
      duration: 150,
      easing: 'easeInOutQuad',
      onComplete: () => {
        animate(animateSelector, {
          scale: 0.5,
          translateY: 50,
          // opacity: 0.1,
          delay: stagger(50, {
            grid: [this.columns, ROWS],
            from: index,
            start: 1,
          }),
        });
      },
    });
  }

  onMouseMove(event: MouseEvent) {
    if (this.animationFrameId) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.handleWaveEffect(event);
      this.animationFrameId = null;
    });
  }

  handleWaveEffect(event: MouseEvent) {
    const gridRect = this.mosaicGrid.nativeElement.getBoundingClientRect();
    const x = event.clientX - gridRect.left;
    const y = event.clientY - gridRect.top;

    const cellWidth = gridRect.width / this.columns;
    const cellHeight = gridRect.height / this.rows;

    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);
    const index = row * this.columns + col;

    if (index === this.lastIndex || index < 0 || index >= this.mosaics.length)
      return;

    this.lastIndex = index;

    const all = Array.from(
      this.mosaicGrid.nativeElement.querySelectorAll<HTMLElement>(
        '.mosaic-elem'
      )
    );

    const baseDelay = 30;
    const maxDistance = 7;

    all.forEach((el) => {
      const idx = parseInt(el.getAttribute('data-index') || '-1', 10);
      if (idx < 0) return;

      const dx = Math.abs((idx % this.columns) - col);
      const dy = Math.abs(Math.floor(idx / this.columns) - row);
      const distance = dx + dy;
      const scale = 0.2 + distance * 0.1;
      const translationY = distance * 10;
      const opacity = 1 - distance * 0.1;

      if (distance <= maxDistance) {
        // Animar deformación con retraso
        animate(el, {
          scale,
          translationY,
          opacity,
          delay: distance * baseDelay,
          duration: 300,
          easing: 'easeOutQuad',
          direction: 'alternate',
        });
      } else {
        // Restaurar suavemente
        animate(el, {
          scale: 1,
          opacity: 1,
          translateY: 0,
          duration: 400,
          easing: 'easeOutCubic',
        });
      }
    });
  }
}
