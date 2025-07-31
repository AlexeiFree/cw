import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { FormControl } from '@angular/forms';

import type { LayoutCoordinates } from '@/shared/types';

import { DocumentZoomService } from '../../../services';

@Injectable()
export class AnnotationDataService {
  private readonly zoomService = inject(DocumentZoomService);

  public readonly textFormControl = new FormControl('', { nonNullable: true });
  public readonly coords = signal<LayoutCoordinates>({
    top: 0,
    left: 0,
  });
  public readonly coordsZoom = signal(this.zoomService.zoom());

  constructor() {
    effect(() => {
      this.coords();

      this.coordsZoom.set(untracked(() => this.zoomService.zoom()));
    });
  }
}
