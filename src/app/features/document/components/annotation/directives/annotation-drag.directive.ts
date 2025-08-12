import {
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  untracked,
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
import { DocumentAnnotation } from '../annotation';

@Directive({
  selector: '[cwAnnotationDrag]',
})
export class AnnotationDragDirective implements OnInit {
  readonly #zoomService = inject(DocumentZoomService);
  readonly #annotation = inject(DocumentAnnotation);
  readonly #isServer = inject(IS_SERVER);
  readonly #destroyRef = inject(DestroyRef);
  readonly #element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  readonly #pointerDown$ = fromEvent<PointerEvent>(
    this.#element,
    'pointerdown',
  );
  readonly #pointerMove$ = fromEvent<PointerEvent>(
    this.#element,
    'pointermove',
  );
  readonly #pointerUp$ = fromEvent<PointerEvent>(this.#element, 'pointerup');
  readonly #coordsZoom = signal(this.#zoomService.zoom());

  constructor() {
    effect(() => {
      const zoom = untracked(() => this.#zoomService.zoom());

      this.#annotation.state().value.coords();
      this.#coordsZoom.set(zoom);
    });
  }

  public ngOnInit(): void {
    if (!this.#isServer) this.#initDragging();
  }

  #handlePointerDown(event: PointerEvent): LayoutCoordinates {
    const { coords } = this.#annotation.state().value;
    const zoom = this.#zoomService.zoom();
    const left = event.clientX - (coords().left / this.#coordsZoom()) * zoom;
    const top = event.clientY - (coords().top / this.#coordsZoom()) * zoom;
    this.#element.setPointerCapture(event.pointerId);

    return { left, top };
  }

  #handlePointerMove(move: PointerEvent, start: LayoutCoordinates): void {
    this.#annotation.state().update({
      coords: {
        left: move.clientX - start.left,
        top: move.clientY - start.top,
      },
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
