import type { WritableSignal } from '@angular/core';
import type { FormControl } from '@angular/forms';

import type { LayoutCoordinates } from '@/shared/types';

export interface DocumentAnnotationData extends LayoutCoordinates {
  text: string;
}

export interface AnnotationDeleteEvent {
  needConfirmation?: boolean;
}

export interface DocumentAnnotationBase {
  coords: WritableSignal<LayoutCoordinates>;
  textFormControl: FormControl<string>;
}
