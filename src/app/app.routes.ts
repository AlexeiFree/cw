import { Routes } from '@angular/router';

import { createAnnotatedDocumentRoute } from '@/pages/annotated-document';
import { createHomeRoute } from '@/pages/home';

export const routes: Routes = [
  createHomeRoute(''),
  createAnnotatedDocumentRoute('documents/:documentId'),
  {
    path: '**',
    redirectTo: '',
  },
];
