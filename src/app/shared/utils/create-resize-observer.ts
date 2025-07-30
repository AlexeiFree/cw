import type { Observable } from 'rxjs';
import { fromEventPattern } from 'rxjs';

export function createResizeObserver(element: Element): Observable<ResizeObserverEntry[]> {
  return fromEventPattern<ResizeObserverEntry[]>(
    handler => {
      const observer = new ResizeObserver(entries => handler(entries));
      observer.observe(element);

      return observer;
    },
    (_, observer) => observer.disconnect(),
  );
}
