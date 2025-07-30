import { WritableSignal } from '@angular/core';
import type { FormControl } from '@angular/forms';

export interface DocumentAnnotationCoords {
  top: number;
  left: number;
}

export interface DocumentAnnotationData extends DocumentAnnotationCoords {
  text: string;
}

export interface AnnotationDeleteEvent {
  needConfirmation?: boolean;
}

export interface DocumentAnnotationBase {
  coords: WritableSignal<DocumentAnnotationCoords>;
  formControl: FormControl<string>;
}
