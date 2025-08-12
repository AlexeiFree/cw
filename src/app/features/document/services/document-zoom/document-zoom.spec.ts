import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  ZOOM_INDEX_DEFAULT,
  ZOOM_INDEX_MAX,
  ZOOM_LEVELS,
} from '../../constants';

import { DocumentZoomService } from './document-zoom.service';

describe('DocumentZoomService', () => {
  let zoomService: DocumentZoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), DocumentZoomService],
    });

    zoomService = TestBed.inject(DocumentZoomService);
  });

  it('method incrementZoom changes zoom and respects max limit', () => {
    for (let i = ZOOM_INDEX_DEFAULT; i <= ZOOM_INDEX_MAX; i++) {
      zoomService.incrementZoom();

      expect(zoomService.zoom()).toBe(
        ZOOM_LEVELS[Math.min(i + 1, ZOOM_INDEX_MAX)],
      );
    }
  });

  it('method decrementZoom changes zoom and respects min limit', () => {
    for (let i = ZOOM_INDEX_DEFAULT; i >= 0; i--) {
      zoomService.decrementZoom();

      expect(zoomService.zoom()).toBe(ZOOM_LEVELS[Math.max(i - 1, 0)]);
    }
  });
});
