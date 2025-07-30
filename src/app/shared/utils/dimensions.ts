import type { PointerPosition } from '@/shared/types';

export const wasElementSizeChanged = (
  newRect: DOMRect,
  oldRect: DOMRect,
): boolean =>
  Math.abs(newRect.width - oldRect.width) >= 0.5 ||
  Math.abs(newRect.height - oldRect.height) >= 0.5;

export const isPointerMovedEnough = (
  move: PointerPosition,
  start: PointerPosition,
): boolean => {
  return (
    Math.abs(move.clientX - start.clientX) >= 1 ||
    Math.abs(move.clientY - start.clientY) >= 1
  );
};
