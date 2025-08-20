import type { Route } from '@angular/router';

export const createHomeRoute = (path: string): Route => ({
  path,
  loadComponent: () => import('../components').then((m) => m.Home),
});
