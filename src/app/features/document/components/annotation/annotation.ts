import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
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
  public readonly delete = output<AnnotationDeleteEvent>();

  protected readonly normalizedCoords = computed(() =>
    normalizeCoords(
      this.data.coords(),
      untracked(() => this.#zoomService.zoom()),
    ),
  );

  readonly #zoomService = inject(DocumentZoomService);

  public ngOnInit(): void {
    this.initControlChangeHandling();
    this.initControlTouchedHandling();
  }

  protected handleInput(event: InputEvent): void {
    this.data.textFormControl.setValue(event.target.innerText);
  }

  protected handleBlur(): void {
    if (!this.data.textFormControl.touched) {
      this.data.textFormControl.markAsTouched();
    }

    if (!this.data.textFormControl.value) {
      this.delete.emit({ needConfirmation: false });
    }
  }

  protected handleEscPress(event: KeyboardEvent): void {
    if (this.data.textFormControl.value) {
      event.target.blur();
    } else {
      this.delete.emit({ needConfirmation: false });
    }
  }

  protected handleDeleteClick(): void {
    this.delete.emit({ needConfirmation: true });
  }
}
