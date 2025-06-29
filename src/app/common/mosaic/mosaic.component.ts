import { animate, stagger } from 'animejs';
import { Component } from '@angular/core';

const ROWS = 35;
const COLUMNS = 35;

@Component({
  selector: 'app-mosaic',
  imports: [],
  templateUrl: './mosaic.component.html',
  styleUrl: './mosaic.component.css',
})
export class MosaicComponent {
  mosaics: { id: string }[] = [];
  columns: number = COLUMNS;

  constructor() {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        this.mosaics.push({ id: `${i}-${j}` });
      }
    }
  }

  getCubicSlibings(id: string): string[] {
    const [row, col] = id.split('-').map(Number);
    const cubicSiblings: string[] = [];

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue; // Skip the current element
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLUMNS) {
          cubicSiblings.push(`${newRow}-${newCol}`);
        }
      }
    }

    return cubicSiblings;
  }

  handleMouseOver(event: MouseEvent, id: string) {
    if (!event.target) return;

    animate(event.target, {
      scale: [1, 0.5],
      duration: 300,
      easing: 'easeInOutQuad',
    });

    // this.getCubicSlibings(id).forEach((siblingId) => {
    //   const siblingElement = document.getElementById(siblingId);

    //   if (siblingElement) {
    //     animate(siblingElement, {
    //       scale: [1, 0.65],
    //       duration: 300,
    //       easing: 'easeInOutQuad',
    //     });
    //   }
    // });
  }

  handleMouseLeave(event: MouseEvent, id: string) {
    if (!event.target) return;

    animate(event.target, {
      scale: [1],
      duration: 150,
      easing: 'easeInOutQuad',
      delay: 300,
    });
  }
}
