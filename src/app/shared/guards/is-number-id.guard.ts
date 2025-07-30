import { numberAttribute } from '@angular/core';
import { CanMatchFn } from '@angular/router';

export const isNumberIdGuard: CanMatchFn = (_route, segments) => {
  const lastSegmentPath = segments.at(-1)?.path;
  const numericLastSegment = numberAttribute(lastSegmentPath);

  return !Number.isNaN(numericLastSegment);
};
