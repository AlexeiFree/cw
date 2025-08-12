import {
  AfterViewInit,
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { debounceTime, Observable } from 'rxjs';

import { IS_SERVER } from '@/shared/injection-tokens';
import { createResizeObserver } from '@/shared/utils';

import { FREQUENT_EVENTS_DEBOUNCE_TIME } from '../constants';
import { DocumentZoomService } from '../services';

@Directive({
  selector: '[cwDocumentDimensions]',
})
export class DocumentDimensionsDirective implements AfterViewInit {
  public readonly width = computed(
    () => this.#width() * this.#zoomService.zoom(),
  );

  readonly #isServer = inject(IS_SERVER);
  readonly #destroyRef = inject(DestroyRef);
  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #zoomService = inject(DocumentZoomService);
  readonly #width = signal(0);

  public ngAfterViewInit(): void {
    if (this.#isServer) return;

    this.#determineWidthOnDocumentResize();
  }

  #determineDocumentWidth(): void {
    this.#width.set(this.#elementRef.nativeElement.offsetWidth);
  }

  #determineWidthOnDocumentResize(): void {
    this.#listenDocumentResize()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.#determineDocumentWidth();
      });
  }

  #listenDocumentResize(): Observable<unknown> {
    return createResizeObserver(this.#elementRef.nativeElement).pipe(
      debounceTime(FREQUENT_EVENTS_DEBOUNCE_TIME),
    );
  }
}
