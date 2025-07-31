import type { Signal, WritableSignal } from '@angular/core';
import type { FormControl } from '@angular/forms';

import type { LayoutCoordinates } from '@/shared/types';

export interface DocumentAnnotationData extends LayoutCoordinates {
  text: string;
}

export interface AnnotationDeleteEvent {
  needConfirmation?: boolean;
}

export interface DocumentAnnotationValueAccessorBase {
  coords: WritableSignal<LayoutCoordinates>;
  textFormControl: FormControl<string>;
}

export interface DocumentAnnotationBase
  extends DocumentAnnotationValueAccessorBase {
  lastZoom: Signal<number>;
}
