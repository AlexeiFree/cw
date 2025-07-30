import { filter, fromEvent, map, switchMap } from 'rxjs';

export const listenForPreciseClick = (
  element: HTMLElement,
  clickThreshold = 5,
) =>
  fromEvent<PointerEvent>(element, 'pointerdown').pipe(
    switchMap((down) =>
      fromEvent<PointerEvent>(element, 'pointerup').pipe(
        map((up) => {
          const dx = up.clientX - down.clientX;
          const dy = up.clientY - down.clientY;
          const distance = Math.hypot(dx, dy);

          return { up, distance };
        }),
        filter(({ distance }) => distance < clickThreshold),
        map(({ up }) => up),
      ),
    ),
  );
