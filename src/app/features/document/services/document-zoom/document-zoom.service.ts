import { computed, Injectable, signal } from '@angular/core';

import {
  ZOOM_INDEX_DEFAULT,
  ZOOM_INDEX_MAX,
  ZOOM_LEVELS,
} from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class DocumentZoomService {
  public readonly zoom = computed(() => ZOOM_LEVELS[this.#zoomIndex()]);
  public readonly isMax = computed(() => this.#zoomIndex() >= ZOOM_INDEX_MAX);
  public readonly isMin = computed(() => this.#zoomIndex() <= 0);

  readonly #zoomIndex = signal(ZOOM_INDEX_DEFAULT);

  public incrementZoom(): void {
    if (!this.isMax()) {
      this.#zoomIndex.update((index) => index + 1);
    }
  }

  public decrementZoom(): void {
    if (!this.isMin()) {
      this.#zoomIndex.update((index) => index - 1);
    }
  }
}
