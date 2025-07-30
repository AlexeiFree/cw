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
  takeWhile,
  tap,
  withLatestFrom,
} from 'rxjs';

import { IS_SERVER } from '@/shared/injection-tokens';
import {
  animationFrame$,
  isPointerMovedEnough,
  wasElementSizeChanged,
} from '@/shared/utils';

import { DocumentDimensionsDirective } from '../../../directives';
import { DOCUMENT_ANNOTATION } from '../annotation.token';

import type { DragStartData } from './annotation-drag.types';

@Directive({
  selector: '[cwAnnotationDrag]',
})
export class AnnotationDragDirective implements OnInit {
  private readonly isServer = inject(IS_SERVER);
  private readonly destroyRef = inject(DestroyRef);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly annotation = inject(DOCUMENT_ANNOTATION);
  private readonly documentDimensions = inject(DocumentDimensionsDirective);

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
  private isFilteringDone = false;

  public ngOnInit(): void {
    if (!this.isServer) this.initDragging();
  }

  public handlePointerDown(event: PointerEvent): DragStartData {
    const elRect = this.element.getBoundingClientRect();
    const { clientX, clientY } = event;
    const coords = this.annotation.coords();
    const elementX = clientX - coords.left;
    const elementY = clientY - coords.top;

    this.element.setPointerCapture(event.pointerId);

    return { elementX, elementY, elRect, clientX, clientY };
  }

  public handlePointerMove(move: PointerEvent, start: DragStartData): void {
    const x = move.clientX;
    const y = move.clientY;
    this.annotation.coords.set({
      left: x - start.elementX,
      top: y - start.elementY,
    });
  }

  private filterDuringDrag(
    pointerMoveEvent: PointerEvent,
    start: DragStartData,
  ): boolean {
    if (this.isFilteringDone) return true;

    if (isPointerMovedEnough(pointerMoveEvent, start)) {
      this.isFilteringDone = true;
    } else {
      return true;
    }

    return !wasElementSizeChanged(
      this.element.getBoundingClientRect(),
      start.elRect,
    );
  }

  private initDragging(): void {
    this.pointerDown$
      .pipe(
        map((event) => this.handlePointerDown(event)),
        switchMap((start) =>
          this.pointerMove$.pipe(
            debounce(() => animationFrame$),
            takeWhile((move) => this.filterDuringDrag(move, start)),
            withLatestFrom(of(start)),
            takeUntil(
              this.pointerUp$.pipe(tap(() => (this.isFilteringDone = false))),
            ),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(([move, start]) => this.handlePointerMove(move, start));
  }
}
