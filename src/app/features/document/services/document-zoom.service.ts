import { Injectable, linkedSignal, signal } from '@angular/core';

import { ZOOM_LEVELS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class DocumentZoomService {
  public readonly zoomIndex = signal(ZOOM_LEVELS.indexOf(1));
  public readonly zoom = linkedSignal(() => ZOOM_LEVELS[this.zoomIndex()]);

  public changeZoom(isIncreasing: boolean): void {
    this.zoomIndex.update((index) => index + (isIncreasing ? 1 : -1));
  }
}
