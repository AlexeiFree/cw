import { signal } from '@angular/core';

import type { WritableSignals } from '@/shared/types';

export const mapToWritableSignals = <T extends object>(
  value: T,
): WritableSignals<T> => {
  const entries = Object.entries(value);
  const signalifiedEntries = entries.map(([key, value]) => [
    key,
    signal(value),
  ]);

  return Object.fromEntries(signalifiedEntries) as WritableSignals<T>;
};
