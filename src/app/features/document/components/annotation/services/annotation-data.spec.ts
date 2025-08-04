import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DocumentZoomService } from '@/features/document/services';

import { AnnotationDataService } from './annotation-data.service';

describe('AnnotationDataService', () => {
  let data: AnnotationDataService;
  let zoomService: DocumentZoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        AnnotationDataService,
        DocumentZoomService,
      ],
    });

    data = TestBed.inject(AnnotationDataService);
    zoomService = TestBed.inject(DocumentZoomService);
  });

  it(`setting coords saves coordsZoom and subsequent zoom changing doesn't influence on coordsZoom value`, () => {
    const coordsZoom = zoomService.zoom();

    data.coords.set({ left: 0, top: 0 });

    expect(
      data.coordsZoom() === coordsZoom &&
        data.coordsZoom() === zoomService.zoom(),
    )
      .withContext('before incrementing zoom')
      .toBe(true);

    zoomService.incrementZoom();

    expect(
      data.coordsZoom() === coordsZoom &&
        data.coordsZoom() < zoomService.zoom(),
    )
      .withContext('after incrementing zoom')
      .toBe(true);
  });
});
