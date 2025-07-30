import {
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
import { createValueAccessorProvider } from '@/shared/utils';

import { DocumentZoomService } from '../../services';
import type {
  AnnotationDeleteEvent,
  DocumentAnnotationBase,
  DocumentAnnotationCoords,
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
})
export class DocumentAnnotation
  extends ControlAccessorDirective
  implements OnInit, DocumentAnnotationBase
{
  private readonly zoomService = inject(DocumentZoomService);

  public readonly delete = output<AnnotationDeleteEvent | undefined>();

  public readonly formControl = new FormControl('', { nonNullable: true });
  public readonly coords = signal<DocumentAnnotationCoords>({
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
    this.formControl.setValue(event.target.innerText);
  }

  public handleBlur(): void {
    if (!this.formControl.touched) {
      this.formControl.markAsTouched();
    }

    if (!this.formControl.value) {
      this.delete.emit(undefined);
    }
  }

  public handleEscPress(event: KeyboardEvent): void {
    if (this.formControl.value) {
      event.target.blur();
    } else {
      this.delete.emit(undefined);
    }
  }
}
