import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

import { IS_SERVER } from '@/shared/injection-tokens';

@Directive({ selector: '[cwAutofocus]' })
export class AutofocusDirective implements AfterViewInit {
  private readonly isServer = inject(IS_SERVER);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  public ngAfterViewInit(): void {
    if (this.isServer) return;

    this.element.nativeElement.focus();
  }
}
