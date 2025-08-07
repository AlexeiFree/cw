import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal,
  untracked,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AutofocusDirective } from '@/shared/directives';
import { LayoutCoordinates } from '@/shared/types';

import {
  DocumentAnnotationsService,
  DocumentZoomService,
} from '../../services';
import type { AnnotationData } from '../../types';
import { normalizeCoords } from '../../utils';

import { AnnotationDragDirective } from './directives';

@Component({
  selector: 'cw-document-annotation',
  templateUrl: './annotation.html',
  styleUrl: './annotation.scss',
  imports: [AutofocusDirective, ReactiveFormsModule, AnnotationDragDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentAnnotation implements OnInit {
  readonly #dataService = inject(DocumentAnnotationsService);

  public readonly index = input.required<number>();

  protected normalizedCoords!: Signal<LayoutCoordinates>;

  readonly #zoomService = inject(DocumentZoomService);
  readonly #annotationsService = inject(DocumentAnnotationsService);

  public get annotationData(): AnnotationData {
    return this.#dataService.get(untracked(() => this.index()));
  }

  public ngOnInit(): void {
    this.normalizedCoords = computed(() => {
      return normalizeCoords(
        this.annotationData.coords(),
        untracked(() => this.#zoomService.zoom()),
      );
    });
  }

  protected handleInput(event: InputEvent): void {
    this.annotationData.text.set(event.target.innerText);
  }

  protected handleBlur(): void {
    if (!this.annotationData.text()) {
      this.#handleAnnotationDelete(false);
    }
  }

  protected handleEscPress(event: KeyboardEvent): void {
    if (this.annotationData.text()) {
      event.target.blur();
    } else {
      this.#handleAnnotationDelete(false);
    }
  }

  protected handleDeleteClick(): void {
    this.#handleAnnotationDelete(true);
  }

  #handleAnnotationDelete(needConfirmation: boolean): void {
    if (
      !needConfirmation ||
      confirm(`Подтверите удаление аннотации:\n${this.annotationData.text()}`)
    ) {
      this.#annotationsService.delete(this.index());
    }
  }
}
