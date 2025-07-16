import { animate, createTimeline } from 'animejs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteTransitionService {
  private shapeEl: SVGElement | null = null;
  private isTransitioning = false;

  constructor(private router: Router) {}

  private createTransitionElement(): SVGElement {
    const svgNS = 'http://www.w3.org/2000/svg';

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.position = 'fixed';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100vw';
    svg.style.height = '100vh';
    svg.style.zIndex = '9999';
    svg.style.pointerEvents = 'none';
    svg.style.transformOrigin = 'left';
    svg.style.transform = 'scaleX(0)';
    svg.style.translate = '0%';

    const polygon = document.createElementNS(svgNS, 'polygon');
    polygon.setAttribute('points', '0,0 100,0 75,100 0,100');
    polygon.classList = 'fill-foreground';

    svg.appendChild(polygon);
    document.body.appendChild(svg);

    return svg;
  }

  private isSamePath(path: string): boolean {
    return this.router.url === path;
  }

  async navigate(path: string) {
    if (this.isTransitioning || this.isSamePath(path)) return;

    this.isTransitioning = true;

    this.shapeEl?.remove(); // Purge previous element if it exists
    this.shapeEl = this.createTransitionElement();

    const tl = createTimeline({
      autoplay: false,
      defaults: { duration: 650, ease: 'inOutQuad' },
    });

    tl.add(this.shapeEl, {
      scaleX: ['0', '1'],
    }).add(
      this.shapeEl.childNodes[0],
      {
        points: ['0,0 100,0 100,100 0,100'],
      },
      200
    );

    tl.play().then(() => {
      this.router.navigate([path]).then(() => {
        if (this.shapeEl) {
          animate(this.shapeEl, {
            translateX: ['0%', '100%'],
            duration: 350,
            ease: 'inOutQuad',
            onComplete: () => {
              this.isTransitioning = false;
            },
          });
        }
      });
    });
  }
}
