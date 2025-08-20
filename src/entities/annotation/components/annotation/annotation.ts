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

import { AutofocusDirective } from '@/shared/directives';
import { ZoomService } from '@/shared/services';
import { LayoutCoordinates } from '@/shared/types';

import type { AnnotationModel } from '../../models';
import { AnnotationsStoreService } from '../../services';
import { normalizeCoords } from '../../utils';

@Component({
  selector: 'cw-annotation',
  templateUrl: './annotation.html',
  styleUrl: './annotation.scss',
  imports: [AutofocusDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Annotation implements OnInit {
  public readonly state = input.required<AnnotationModel>();

  protected normalizedCoords!: Signal<LayoutCoordinates>;

  readonly #annotationsStore = inject(AnnotationsStoreService);
  readonly #zoomService = inject(ZoomService);

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
