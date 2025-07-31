import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  linkedSignal,
  OnInit,
  output,
  untracked,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AutofocusDirective } from '@/shared/directives';
import { createValueAccessorProvider } from '@/shared/utils';

import { DocumentZoomService } from '../../services';
import type { AnnotationDeleteEvent } from '../../types';
import { normalizeCoords } from '../../utils';

import {
  AnnotationDragDirective,
  ControlAccessorDirective,
} from './directives';
import { AnnotationDataService } from './services';

@Component({
  selector: 'cw-document-annotation',
  templateUrl: './annotation.html',
  styleUrl: './annotation.scss',
  providers: [
    AnnotationDataService,
    createValueAccessorProvider(forwardRef(() => DocumentAnnotation)),
  ],
  imports: [AutofocusDirective, ReactiveFormsModule, AnnotationDragDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentAnnotation
  extends ControlAccessorDirective
  implements OnInit
{
  private readonly zoomService = inject(DocumentZoomService);

  public readonly delete = output<AnnotationDeleteEvent>();

  public readonly normalizedCoords = linkedSignal(() =>
    normalizeCoords(
      this.data.coords(),
      untracked(() => this.zoomService.zoom()),
    ),
  );

  public ngOnInit(): void {
    this.initHandleControlChange();
    this.initHandleTouchedChange();
  }

  public handleInput(event: InputEvent): void {
    this.data.textFormControl.setValue(event.target.innerText);
  }

  public handleBlur(): void {
    if (!this.data.textFormControl.touched) {
      this.data.textFormControl.markAsTouched();
    }

    if (!this.data.textFormControl.value) {
      this.delete.emit({ needConfirmation: false });
    }
  }

  public handleEscPress(event: KeyboardEvent): void {
    if (this.data.textFormControl.value) {
      event.target.blur();
    } else {
      this.delete.emit({ needConfirmation: false });
    }
  }

  public handleDeleteClick(): void {
    this.delete.emit({ needConfirmation: true });
  }
}
