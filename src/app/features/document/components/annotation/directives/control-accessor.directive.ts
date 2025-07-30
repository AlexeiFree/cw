import {
  DestroyRef,
  Directive,
  inject,
  Injector,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  type FormControl,
  TouchedChangeEvent,
} from '@angular/forms';

import { combineLatest, filter } from 'rxjs';

import type {
  DocumentAnnotationBase,
  DocumentAnnotationCoords,
  DocumentAnnotationData,
} from '../../../types';

@Directive()
export abstract class ControlAccessorDirective
  implements ControlValueAccessor, DocumentAnnotationBase
{
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly injector = inject(Injector);

  public abstract readonly coords: WritableSignal<DocumentAnnotationCoords>;
  public abstract readonly formControl: FormControl<string>;

  protected setControlTouched?: () => void;

  private handleChange?: (_: DocumentAnnotationData) => void;

  public initHandleControlChange(): void {
    combineLatest([
      this.formControl.valueChanges,
      toObservable(this.coords, { injector: this.injector }),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([text, { top, left }]) => {
        this.handleChange?.({
          text,
          top,
          left,
        });
      });
  }

  public initHandleTouchedChange(): void {
    this.formControl.events
      .pipe(
        filter((event) => event instanceof TouchedChangeEvent && event.touched),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.setControlTouched?.();
      });
  }

  public writeValue({ text, top, left }: DocumentAnnotationData): void {
    this.formControl.setValue(text);
    this.coords.set({ top, left });
  }

  public registerOnChange(fn: () => void): void {
    this.handleChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.setControlTouched = fn;
  }
}
