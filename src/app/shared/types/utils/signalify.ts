import type { Signal, WritableSignal } from '@angular/core';

export type ReadonlySignals<T> = {
  [K in keyof T]: Signal<T[K]>;
};

export type WritableSignals<T> = {
  [K in keyof T]: WritableSignal<T[K]>;
};
