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
import { normalizeCoords } from '../../../utils';
import { DOCUMENT_ANNOTATION } from '../annotation.token';

@Directive({
  selector: '[cwAnnotationDrag]',
})
export class AnnotationDragDirective implements OnInit {
  private readonly zoomService = inject(DocumentZoomService);
  private readonly isServer = inject(IS_SERVER);
  private readonly destroyRef = inject(DestroyRef);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly annotation = inject(DOCUMENT_ANNOTATION);

  private readonly pointerDown$ = fromEvent<PointerEvent>(
    this.element,
    'pointerdown',
  );
  private readonly pointerMove$ = fromEvent<PointerEvent>(
    this.element,
    'pointermove',
  );
  private readonly pointerUp$ = fromEvent<PointerEvent>(
    this.element,
    'pointerup',
  );

  public ngOnInit(): void {
    if (!this.isServer) this.initDragging();
  }

  public handlePointerDown(event: PointerEvent): LayoutCoordinates {
    const coords = this.annotation.coords();
    const left = event.clientX - coords.left * this.zoomService.zoom();
    const top = event.clientY - coords.top * this.zoomService.zoom();

    this.element.setPointerCapture(event.pointerId);

    return { left, top };
  }

  public handlePointerMove(move: PointerEvent, start: LayoutCoordinates): void {
    this.annotation.coords.set(
      normalizeCoords(
        {
          left: move.clientX - start.left,
          top: move.clientY - start.top,
        },
        this.zoomService.zoom(),
      ),
    );
  }

  private initDragging(): void {
    this.pointerDown$
      .pipe(
        map((event) => this.handlePointerDown(event)),
        switchMap((start) =>
          this.pointerMove$.pipe(
            debounce(() => animationFrame$),
            withLatestFrom(of(start)),
            takeUntil(this.pointerUp$),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(([move, start]) => this.handlePointerMove(move, start));
  }
}
