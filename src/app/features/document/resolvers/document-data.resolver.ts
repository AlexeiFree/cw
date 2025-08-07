import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { DocumentApiService } from '../services';
import type { DocumentData } from '../types';

export const resolveDocumentData: ResolveFn<DocumentData> = (route) => {
  const apiService = inject(DocumentApiService);
  const id = route.paramMap.get('documentId');

  return apiService.fetchDocumentData(Number(id));
};
