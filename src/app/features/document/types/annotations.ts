import type { WritableSignal } from '@angular/core';

import type { LayoutCoordinates } from '@/shared/types';

export interface AnnotationData {
  readonly text: WritableSignal<string>;
  readonly coords: WritableSignal<LayoutCoordinates>;
}

export interface AnnotationCreationData {
  coords: LayoutCoordinates;
}
