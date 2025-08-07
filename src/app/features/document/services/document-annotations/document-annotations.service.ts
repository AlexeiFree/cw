import { Injectable, Signal, signal, untracked } from '@angular/core';

import type { AnnotationCreationData, AnnotationData } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class DocumentAnnotationsService {
  public readonly annotations: Signal<AnnotationData[]>;

  readonly #annotations = signal<AnnotationData[]>([]);

  public get annotationsRaw(): AnnotationData[] {
    return untracked(() => this.annotations());
  }

  public get(index: number): AnnotationData {
    return untracked(() => this.#annotations()[index]);
  }

  public push({ coords }: AnnotationCreationData): void {
    this.#annotations.update((annotations) => [
      ...annotations,
      {
        coords: signal(coords),
        text: signal(''),
      },
    ]);
  }

  public delete(index: number): void {
    this.#annotations.update((annotations) => [
      ...annotations.slice(0, index),
      ...annotations.slice(index + 1),
    ]);
  }

  constructor() {
    this.annotations = this.#annotations.asReadonly();
  }
}
