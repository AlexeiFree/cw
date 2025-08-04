import {
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  untracked,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import type { LayoutCoordinates } from '@/shared/types';

import { DocumentZoomService } from '../../../services';
import type { Zoom } from '../../../types';

@Injectable()
export class AnnotationDataService {
  public readonly textFormControl = new FormControl('', { nonNullable: true });
  public readonly coords = signal<LayoutCoordinates>({
    top: 0,
    left: 0,
  });
  public readonly coordsZoom: Signal<Zoom>;

  readonly #zoomService = inject(DocumentZoomService);
  readonly #coordsZoom = signal(this.#zoomService.zoom());

  constructor() {
    this.coordsZoom = this.#coordsZoom.asReadonly();

    effect(() => {
      this.coords();
      this.#coordsZoom.set(untracked(() => this.#zoomService.zoom()));
    });
  }
}
