import type { Route } from '@angular/router';

import { isNumberIdGuard } from '@/shared/guards';

import { resolveDocumentData } from '../resolvers';

export const createDocumentRoute = (path: string): Route => ({
  path,
  loadComponent: () =>
    import('../components/document-root').then((m) => m.DocumentRoot),
  canMatch: [isNumberIdGuard(1)],
  resolve: {
    documentData: resolveDocumentData,
  },
});
