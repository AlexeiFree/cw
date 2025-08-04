import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { firstValueFrom } from 'rxjs';

import type { DocumentData } from '../../types';

import { DocumentDataService } from './document-data.service';
import { createDocumentApiUrl } from './utils';

describe('DocumentDataService', () => {
  let dataService: DocumentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        DocumentDataService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    dataService = TestBed.inject(DocumentDataService);
  });

  it('method fetchDocumentData fetches document data properly', async () => {
    const httpTesting = TestBed.inject(HttpTestingController);

    const documentId = 1;

    const config$ = dataService.fetchDocumentData(documentId);
    const configPromise = firstValueFrom(config$);
    const req = httpTesting.expectOne(
      createDocumentApiUrl(documentId),
      'Request to load document data',
    );
    const data: DocumentData = {
      name: 'title',
      pages: [{ number: 1, imageUrl: 'url' }],
    };

    expect(req.request.method).withContext('request method').toBe('GET');

    req.flush(data);

    expect(await configPromise)
      .withContext('response')
      .toEqual(data);

    httpTesting.verify();
  });
});
