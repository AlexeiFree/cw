import { UnionToIntersection } from '@/shared/types';
import { mapToWritableSignals } from '@/shared/utils';

import type {
  AnnotationCreationData,
  AnnotationState,
  AnnotationStateWritable,
  AnnotationUpdateData,
} from '../types';

let idIncrement = 0;

export class AnnotationModel {
  public readonly id = idIncrement++;
  public readonly value: AnnotationState;

  readonly #value: AnnotationStateWritable;

  public update(data: AnnotationUpdateData): void {
    Object.entries(data).forEach(([key, value]) => {
      this.#value[key].set(value as UnionToIntersection<typeof value>);
    });
  }

  constructor({ coords }: AnnotationCreationData) {
    this.#value = mapToWritableSignals({ coords, text: '' });
    this.value = this.#value;
  }
}
