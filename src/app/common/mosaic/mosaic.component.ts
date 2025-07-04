import { animate } from 'animejs';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { pull, throttle } from 'lodash';

const ROWS = 30;
const COLUMNS = 30;

@Component({
  selector: 'app-mosaic',
  imports: [],
  templateUrl: './mosaic.component.html',
  styleUrl: './mosaic.component.css',
})
export class MosaicComponent implements AfterViewInit, OnDestroy {
  grid = {
    columns: COLUMNS, // Number of columns in the grid
    rows: ROWS, // Number of rows in the grid
    elemSize: 32, // Size of each grid element in pixels
  };
  mosaics: { id: string }[] = [];

  private mosaicNodes: HTMLElement[] = [];
  private animationFrameId: number | null = null;
  private previousAnimatedNodes = new Set<number>();
  private currentlyAnimated = new Set<number>();
  private restoreIntervalId: any;
  private animationConfig = {
    scale: 0.3, // Base scale for the nodes
    delay: 15, // Miliseconds base delay
    maxDistance: 5, // Maximum distance (nodes) for animation effect
    pullFactor: 0.3, // How much the nodes are pulled towards the center
  };

  throttledMouseOver: (event: MouseEvent) => void;

  @ViewChild('mosaicGrid', { static: true })
  mosaicGrid!: ElementRef<HTMLDivElement>;
  @ViewChildren('mosaicElem', { read: ElementRef }) mosaicElems!: QueryList<
    ElementRef<HTMLElement>
  >;

  constructor() {
    for (let i = 0; i < this.grid.rows; i++) {
      for (let j = 0; j < this.grid.columns; j++) {
        this.mosaics.push({ id: `${i}-${j}` });
      }
    }

    this.throttledMouseOver = throttle(
      (event: MouseEvent) => this.onMouseMove(event),
      50,
      { leading: true, trailing: false }
    );
  }

  ngAfterViewInit(): void {
    this.mosaicNodes = this.mosaicElems.toArray().map((el) => el.nativeElement);

    if (typeof window !== 'undefined') {
      this.restoreIntervalId = setInterval(() => {
        this.restoreInactiveNodes();
      }, 50); // 100–200ms es un buen intervalo
    }
  }

  ngOnDestroy() {
    if (this.restoreIntervalId) clearInterval(this.restoreIntervalId);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  restoreNode(element: HTMLElement) {
    animate(element, {
      transform: 'translate(0, 0) scale(1)',
      duration: 0,
      easing: 'easeOutSine',
    });
  }

  restoreInactiveNodes() {
    for (let i = 0; i < this.mosaicNodes.length; i++) {
      if (!this.currentlyAnimated.has(i)) {
        const el = this.mosaicNodes[i];

        if (!el) continue;

        this.restoreNode(el);
      }
    }
  }

  animateNode(
    element: HTMLElement,
    deltaX: number,
    deltaY: number,
    scale: number,
    delay: number
  ) {
    animate(element, {
      transform: `translate(${deltaX}px, ${deltaY}px) scale(${scale})`,
      delay,
      duration: 500,
      easing: 'easeOutQuad',
    });
  }

  getRectMetadata(clientX: number, clientY: number) {
    const gridEl = this.mosaicGrid.nativeElement;
    const gridRect = gridEl.getBoundingClientRect();

    const mouseX = clientX - gridRect.left;
    const mouseY = clientY - gridRect.top;

    const col = Math.floor(mouseX / this.grid.elemSize);
    const row = Math.floor(mouseY / this.grid.elemSize);

    const centerX = (col + 0.5) * this.grid.elemSize;
    const centerY = (row + 0.5) * this.grid.elemSize;
    const index = row * this.grid.columns + col;

    return {
      index,
      mouseX,
      mouseY,
      col,
      row,
      centerX,
      centerY,
      gridRect,
    };
  }

  getElementPositionInfo(index: number, col: number, row: number) {
    const cellCol = index % this.grid.columns;
    const cellRow = Math.floor(index / this.grid.columns);

    const dx = cellCol - col;
    const dy = cellRow - row;

    const distance = Math.hypot(dx, dy);
    const isInRange = distance <= this.animationConfig.maxDistance;

    return {
      cellCol,
      cellRow,
      dx,
      dy,
      distance,
      isInRange,
    };
  }

  getElementAnimation(
    distance: number,
    cellCol: number,
    cellRow: number,
    centerX: number,
    centerY: number
  ) {
    const distanceFactor = 1 - distance / this.animationConfig.maxDistance;

    const cellCenterX = (cellCol + 0.5) * this.grid.elemSize;
    const cellCenterY = (cellRow + 0.5) * this.grid.elemSize;

    const delay = distance * this.animationConfig.delay;
    const scale = this.animationConfig.scale + distance * 0.1;
    const deltaX =
      (centerX - cellCenterX) *
      this.animationConfig.pullFactor *
      distanceFactor;
    const deltaY =
      (centerY - cellCenterY) *
      this.animationConfig.pullFactor *
      distanceFactor;

    return {
      delay,
      scale,
      deltaX,
      deltaY,
    };
  }

  getAnimableNodes(
    col: number,
    row: number
  ): { toAnimate: HTMLElement[]; toRestore: HTMLElement[] } {
    const { columns, rows } = this.grid;
    const { maxDistance } = this.animationConfig;

    const toAnimate: HTMLElement[] = [];
    const animatedIndices = new Set<number>();

    // Recorrer solo vecinos dentro del rango cuadrado
    for (let dy = -maxDistance; dy <= maxDistance; dy++) {
      for (let dx = -maxDistance; dx <= maxDistance; dx++) {
        const nCol = col + dx;
        const nRow = row + dy;

        // Ignorar fuera del grid
        if (nCol < 0 || nCol >= columns || nRow < 0 || nRow >= rows) continue;

        const idx = nRow * columns + nCol;
        const el = this.mosaicNodes[idx];
        if (!el) continue;

        const { isInRange } = this.getElementPositionInfo(idx, col, row);
        if (!isInRange) continue;

        toAnimate.push(el);
        animatedIndices.add(idx);
      }
    }

    // Restaurar nodos que estaban animados antes pero ya no están
    const toRestore: HTMLElement[] = [];
    for (const prevIdx of this.previousAnimatedNodes) {
      if (!animatedIndices.has(prevIdx)) {
        const el = this.mosaicNodes[prevIdx];
        if (el) toRestore.push(el);
      }
    }

    // Actualiza el set para el próximo ciclo
    this.previousAnimatedNodes = animatedIndices;

    return {
      toAnimate,
      toRestore,
    };
  }

  onMouseMove(event: MouseEvent) {
    this.animationFrameId = requestAnimationFrame(() => {
      this.handleWaveEffect(event.clientX, event.clientY);
    });
  }

  handleWaveEffect(clientX: number, clientY: number) {
    const newlyAnimated = new Set<number>();

    const { col, row, centerX, centerY } = this.getRectMetadata(
      clientX,
      clientY
    );

    this.mosaicNodes.forEach((el) => {
      const idx = Number((el.dataset as { index: string }).index);

      if (isNaN(idx)) return;

      const { isInRange, distance, cellCol, cellRow } =
        this.getElementPositionInfo(idx, col, row);

      if (isInRange) {
        newlyAnimated.add(idx);

        const { delay, deltaX, deltaY, scale } = this.getElementAnimation(
          distance,
          cellCol,
          cellRow,
          centerX,
          centerY
        );

        this.animateNode(el, deltaX, deltaY, scale, delay);
      }
    });

    this.currentlyAnimated = newlyAnimated;
  }
}
