import { Provider, Type } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const createValueAccessorProvider = (
  component: Type<object>,
): Provider => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: component,
  multi: true,
});
