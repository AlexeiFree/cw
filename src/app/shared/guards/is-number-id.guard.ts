import { CanMatchFn } from '@angular/router';

export const isNumberIdGuard =
  (segmentIndexForCheck: number): CanMatchFn =>
  (_route, segments): boolean => {
    const checkedSegment = segments[segmentIndexForCheck]?.path;

    return Number.isInteger(Number(checkedSegment));
  };
