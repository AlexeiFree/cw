import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';

import { catchError, of } from 'rxjs';

import { DocumentApiService, type DocumentData } from '@/entities/document';

export const resolveDocumentData: ResolveFn<DocumentData> = (route) => {
  const router = inject(Router);
  const apiService = inject(DocumentApiService);
  const id = route.paramMap.get('documentId');

  return apiService
    .fetchDocumentData(Number(id))
    .pipe(catchError(() => of(createRedirectToHome(router))));
};

const createRedirectToHome = (router: Router) =>
  new RedirectCommand(router.parseUrl(''));
