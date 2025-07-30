import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { debounceTime } from 'rxjs';

import { IS_SERVER } from '@/shared/injection-tokens';
import { createResizeObserver } from '@/shared/utils';

import { FREQUENT_EVENTS_DEBOUNCE_TIME } from '../constants';
import { DocumentZoomService } from '../services';

@Directive({
  selector: '[cwDocumentDimensions]',
})
export class DocumentDimensionsDirective implements AfterViewInit {
  private readonly isServer = inject(IS_SERVER);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zoomService = inject(DocumentZoomService);

  #width = 0;

  public get width(): number {
    return this.#width * this.zoomService.zoom();
  }

  public ngAfterViewInit(): void {
    if (this.isServer) return;
    createResizeObserver(this.elementRef.nativeElement)
      .pipe(
        debounceTime(FREQUENT_EVENTS_DEBOUNCE_TIME),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.setWidth();
      });
  }

  private setWidth(): void {
    this.#width = this.elementRef.nativeElement.offsetWidth;
  }
}
