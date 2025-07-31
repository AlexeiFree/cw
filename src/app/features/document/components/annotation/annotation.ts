import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  linkedSignal,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { AutofocusDirective } from '@/shared/directives';
import type { LayoutCoordinates } from '@/shared/types';
import { createValueAccessorProvider } from '@/shared/utils';

import { DocumentZoomService } from '../../services';
import type {
  AnnotationDeleteEvent,
  DocumentAnnotationBase,
} from '../../types';
import { normalizeCoords } from '../../utils';

import { DOCUMENT_ANNOTATION } from './annotation.token';
import {
  AnnotationDragDirective,
  ControlAccessorDirective,
} from './directives';

@Component({
  selector: 'cw-document-annotation',
  templateUrl: './annotation.html',
  styleUrl: './annotation.scss',
  providers: [
    createValueAccessorProvider(forwardRef(() => DocumentAnnotation)),
    {
      provide: DOCUMENT_ANNOTATION,
      useExisting: forwardRef(() => DocumentAnnotation),
    },
  ],
  imports: [AutofocusDirective, ReactiveFormsModule, AnnotationDragDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentAnnotation
  extends ControlAccessorDirective
  implements OnInit, DocumentAnnotationBase
{
  private readonly zoomService = inject(DocumentZoomService);

  public readonly delete = output<AnnotationDeleteEvent>();

  public readonly textFormControl = new FormControl('', { nonNullable: true });
  public readonly coords = signal<LayoutCoordinates>({
    top: 0,
    left: 0,
  });

  public readonly normalizedCoords = linkedSignal(() =>
    normalizeCoords(this.coords(), this.zoomService.zoom()),
  );

  public ngOnInit(): void {
    this.initHandleControlChange();
    this.initHandleTouchedChange();
  }

  public handleInput(event: InputEvent): void {
    this.textFormControl.setValue(event.target.innerText);
  }

  public handleBlur(): void {
    if (!this.textFormControl.touched) {
      this.textFormControl.markAsTouched();
    }

    if (!this.textFormControl.value) {
      this.delete.emit({ needConfirmation: false });
    }
  }

  public handleEscPress(event: KeyboardEvent): void {
    if (this.textFormControl.value) {
      event.target.blur();
    } else {
      this.delete.emit({ needConfirmation: false });
    }
  }

  public handleDeleteClick(): void {
    this.delete.emit({ needConfirmation: true });
  }
}
