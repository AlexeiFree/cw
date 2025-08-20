import type { Route } from '@angular/router';

import { isNumberIdGuard } from '@/shared/guards';

import { resolveDocumentData } from '../resolvers';

export const createAnnotatedDocumentRoute = (path: string): Route => ({
  path,
  loadComponent: () =>
    import('../components').then((m) => m.AnnotatedDocumentPage),
  canMatch: [isNumberIdGuard(1)],
  resolve: {
    documentData: resolveDocumentData,
  },
});
