import { animationFrameScheduler, observeOn, of } from 'rxjs';

export const animationFrame$ = of(null).pipe(
  observeOn(animationFrameScheduler),
);
