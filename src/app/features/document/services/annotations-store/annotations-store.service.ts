import { Injectable, Signal, signal } from '@angular/core';

import { AnnotationModel } from '../../models';
import type { AnnotationCreationData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class AnnotationsStoreService {
  public readonly annotations: Signal<AnnotationModel[]>;

  readonly #annotations = signal<AnnotationModel[]>([]);

  public push({ coords }: AnnotationCreationData): void {
    this.#annotations.update((annotations) => [
      ...annotations,
      new AnnotationModel({ coords }),
    ]);
  }

  public delete(id: number): void {
    const index = this.#annotations().findIndex((item) => item.id === id);

    if (index === -1) return;

    this.#annotations.update((annotations) => [
      ...annotations.slice(0, index),
      ...annotations.slice(index + 1),
    ]);
  }

  constructor() {
    this.annotations = this.#annotations.asReadonly();
  }
}
