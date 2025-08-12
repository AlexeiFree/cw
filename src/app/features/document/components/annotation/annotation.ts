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

import type { AnnotationModel } from '../../models';
import { AnnotationsStoreService, DocumentZoomService } from '../../services';
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
  public readonly state = input.required<AnnotationModel>();

  protected normalizedCoords!: Signal<LayoutCoordinates>;

  readonly #annotationsStore = inject(AnnotationsStoreService);
  readonly #zoomService = inject(DocumentZoomService);

  public ngOnInit(): void {
    this.normalizedCoords = computed(() => {
      return normalizeCoords(
        this.state().value.coords(),
        untracked(() => this.#zoomService.zoom()),
      );
    });
  }

  protected handleInput(event: InputEvent): void {
    this.state().update({
      text: event.target.innerText,
    });
  }

  protected handleBlur(): void {
    if (!this.state().value.text()) {
      this.#delete();
    }
  }

  protected handleEscPress(event: KeyboardEvent): void {
    if (this.state().value.text()) {
      event.target.blur();
    } else {
      this.#delete();
    }
  }

  protected handleDeleteClick(): void {
    this.#deleteWithConfirmation();
  }

  #confirmDeletion(): boolean {
    return confirm(
      `Подтверите удаление аннотации:\n${this.state().value.text()}`,
    );
  }

  #delete(): void {
    this.#annotationsStore.delete(this.state().id);
  }

  #deleteWithConfirmation(): void {
    if (this.#confirmDeletion()) {
      this.#delete();
    }
  }
}
