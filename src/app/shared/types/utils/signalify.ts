import type { Signal, WritableSignal } from '@angular/core';

export type Signalify<T> = {
  [K in keyof T]: Signal<T[K]>;
};

export type SignalifyWritable<T> = {
  [K in keyof T]: WritableSignal<T[K]>;
};
