import type { DocumentAnnotationCoords, Zoom } from '../types';

export const normalizeCoords = (
  { left, top }: DocumentAnnotationCoords,
  zoom: Zoom,
): DocumentAnnotationCoords => ({
  left: left / zoom,
  top: top / zoom,
});
