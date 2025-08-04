import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  debounce,
  fromEvent,
  map,
  of,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs';

import { IS_SERVER } from '@/shared/injection-tokens';
import type { LayoutCoordinates } from '@/shared/types';
import { animationFrame$ } from '@/shared/utils';

import { DocumentZoomService } from '../../../services';
import { AnnotationDataService } from '../services';

@Directive({
  selector: '[cwAnnotationDrag]',
})
export class AnnotationDragDirective implements OnInit {
  readonly #zoomService = inject(DocumentZoomService);
  readonly #isServer = inject(IS_SERVER);
  readonly #destroyRef = inject(DestroyRef);
  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly #data = inject(AnnotationDataService);
  readonly #pointerDown$ = fromEvent<PointerEvent>(
    this.#element,
    'pointerdown',
  );
  readonly #pointerMove$ = fromEvent<PointerEvent>(
    this.#element,
    'pointermove',
  );
  readonly #pointerUp$ = fromEvent<PointerEvent>(this.#element, 'pointerup');

  public ngOnInit(): void {
    if (!this.#isServer) this.#initDragging();
  }

  #handlePointerDown(event: PointerEvent): LayoutCoordinates {
    const { coords, coordsZoom } = this.#data;
    const zoom = this.#zoomService.zoom();
    const left = event.clientX - (coords().left / coordsZoom()) * zoom;
    const top = event.clientY - (coords().top / coordsZoom()) * zoom;
    this.#element.setPointerCapture(event.pointerId);

    return { left, top };
  }

  #handlePointerMove(move: PointerEvent, start: LayoutCoordinates): void {
    this.#data.coords.set({
      left: move.clientX - start.left,
      top: move.clientY - start.top,
    });
  }

  #initDragging(): void {
    this.#pointerDown$
      .pipe(
        map((event) => this.#handlePointerDown(event)),
        switchMap((start) =>
          this.#pointerMove$.pipe(
            debounce(() => animationFrame$),
            withLatestFrom(of(start)),
            takeUntil(this.#pointerUp$),
          ),
        ),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe(([move, start]) => this.#handlePointerMove(move, start));
  }
}
