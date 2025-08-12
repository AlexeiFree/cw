import { signal } from '@angular/core';

import type { SignalifyWritable } from '@/shared/types';

export const signalifyWritable = <T extends object>(
  value: T,
): SignalifyWritable<T> => {
  const entries = Object.entries(value);
  const signalifiedEntries = entries.map(([key, value]) => [
    key,
    signal(value),
  ]);

  return Object.fromEntries(signalifiedEntries) as SignalifyWritable<T>;
};
