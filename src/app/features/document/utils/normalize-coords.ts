import type { LayoutCoordinates } from '@/shared/types';

import type { Zoom } from '../types';

export const normalizeCoords = (
  { left, top }: LayoutCoordinates,
  zoom: Zoom,
): LayoutCoordinates => ({
  left: left / zoom,
  top: top / zoom,
});
