import { Routes } from '@angular/router';

import { createDocumentRoute } from '@/pages/document';
import { createHomeRoute } from '@/pages/home';

export const routes: Routes = [
  createHomeRoute(''),
  createDocumentRoute('documents/:documentId'),
  {
    path: '**',
    redirectTo: '',
  },
];
