import { isPlatformServer } from '@angular/common';
import { inject,InjectionToken, PLATFORM_ID } from '@angular/core';

export const IS_SERVER = new InjectionToken<boolean>('is platform server', {
  factory: () => isPlatformServer(inject(PLATFORM_ID)),
});
