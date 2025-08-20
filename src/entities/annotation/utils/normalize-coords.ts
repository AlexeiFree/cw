import type { LayoutCoordinates, Zoom } from '@/shared/types';

export const normalizeCoords = (
  { left, top }: LayoutCoordinates,
  zoom: Zoom,
): LayoutCoordinates => ({
  left: left / zoom,
  top: top / zoom,
});
