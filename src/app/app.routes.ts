import { Routes } from '@angular/router';

import { createDocumentRoute } from '@/features/document';
import { createHomeRoute } from '@/features/home';

export const routes: Routes = [
  createHomeRoute(''),
  createDocumentRoute('documents/:documentId'),
  {
    path: '**',
    redirectTo: '',
  },
];
