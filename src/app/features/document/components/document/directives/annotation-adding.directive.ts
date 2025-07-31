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
import { NonNullableFormBuilder } from '@angular/forms';

import { IS_SERVER } from '@/shared/injection-tokens';
import type { LayoutCoordinates } from '@/shared/types';
import { listenForPreciseClick } from '@/shared/utils';

import { DocumentDimensionsDirective } from '../../../directives';
import { DocumentZoomService } from '../../../services';
import { Document } from '../document';

@Directive({
  selector: '[cwAnnotationAdding]',
})
export class AnnotationAddingDirective implements AfterViewInit {
  private readonly zoomService = inject(DocumentZoomService);
  private readonly isServer = inject(IS_SERVER);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly documentComponent = inject(Document);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly documentDimensions = contentChild.required(
    DocumentDimensionsDirective,
  );

  public readonly annotationsContainerRef = input.required<HTMLElement>();

  public ngAfterViewInit(): void {
    if (this.isServer) return;

    listenForPreciseClick(this.elementRef.nativeElement)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event: PointerEvent) => {
        this.changeDetectorRef.markForCheck();
        this.handleBodyClick(event);
      });
  }

  public handleBodyClick(click: MouseEvent): void {
    if (
      click
        .composedPath()
        .find((target) => target === this.annotationsContainerRef())
    )
      return;

    this.addAnnotation({
      left:
        (click.offsetX - this.documentDimensions().width / 2) /
        this.zoomService.zoom(),
      top: click.offsetY / this.zoomService.zoom(),
    });
  }

  private addAnnotation(coords: LayoutCoordinates): void {
    this.documentComponent.annotationsFormArray.push(
      this.formBuilder.control({
        ...coords,
        text: '',
      }),
    );
  }
}
