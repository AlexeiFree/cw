import {
  AfterViewInit,
  ChangeDetectorRef,
  contentChild,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IS_SERVER } from '@/shared/injection-tokens';
import type { LayoutCoordinates } from '@/shared/types';
import { listenForPreciseClick } from '@/shared/utils';

import { DocumentDimensionsDirective } from '../../../directives';
import { AnnotationsStoreService } from '../../../services';

@Directive({
  selector: '[cwAnnotationAdding]',
})
export class AnnotationAddingDirective implements AfterViewInit {
  public readonly annotationsContainerRef = input.required<HTMLElement>();

  protected readonly documentDimensions = contentChild.required(
    DocumentDimensionsDirective,
  );

  readonly #isServer = inject(IS_SERVER);
  readonly #destroyRef = inject(DestroyRef);
  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #changeDetectorRef = inject(ChangeDetectorRef);
  readonly #annotationsStoreService = inject(AnnotationsStoreService);

  public ngAfterViewInit(): void {
    if (this.#isServer) return;

    listenForPreciseClick(this.#elementRef.nativeElement)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((event) => {
        this.#changeDetectorRef.markForCheck();
        this.#handleBodyClick(event);
      });
  }

  #handleBodyClick(click: MouseEvent): void {
    this.#addAnnotationByClick(click);
  }

  #addAnnotationByClick(click: MouseEvent): void {
    if (
      click
        .composedPath()
        .find((target) => target === this.annotationsContainerRef())
    )
      return;

    this.#addAnnotation({
      left: click.offsetX - this.documentDimensions().width() / 2,
      top: click.offsetY,
    });
  }

  #addAnnotation(coords: LayoutCoordinates): void {
    this.#annotationsStoreService.push({ coords });
  }
}
