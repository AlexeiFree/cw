import { Routes } from '@angular/router';

import { isNumberIdGuard } from '@/shared/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home').then((m) => m.Home),
  },
  {
    path: 'documents/:documentId',
    loadComponent: () => import('./features/document').then((m) => m.Document),
    canMatch: [isNumberIdGuard],
  },
];
