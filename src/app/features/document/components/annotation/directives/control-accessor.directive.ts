import { DestroyRef, Directive, inject, Injector } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, TouchedChangeEvent } from '@angular/forms';

import { combineLatest, filter } from 'rxjs';

import type { DocumentAnnotationData } from '../../../types';
import { AnnotationDataService } from '../services';

@Directive()
export abstract class ControlAccessorDirective implements ControlValueAccessor {
  protected readonly data = inject(AnnotationDataService);
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly injector = inject(Injector);
  protected setControlTouched?: () => void;

  #handleChange?: (_: DocumentAnnotationData) => void;

  public initControlChangeHandling(): void {
    combineLatest([
      this.data.textFormControl.valueChanges,
      toObservable(this.data.coords, { injector: this.injector }),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([text, { top, left }]) => {
        this.#handleChange?.({
          text,
          top,
          left,
        });
      });
  }

  public initControlTouchedHandling(): void {
    this.data.textFormControl.events
      .pipe(
        filter((event) => event instanceof TouchedChangeEvent && event.touched),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.setControlTouched?.();
      });
  }

  public writeValue({ text, top, left }: DocumentAnnotationData): void {
    this.data.textFormControl.setValue(text);
    this.data.coords.set({ top, left });
  }

  public registerOnChange(fn: () => void): void {
    this.#handleChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.setControlTouched = fn;
  }
}
