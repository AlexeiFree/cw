export declare global {
  interface ObjectConstructor {
    entries<const T extends object>(
      o: T,
    ): { [K in keyof T]-?: [K, T[K]] }[keyof T][];
  }

  interface KeyboardEvent {
    target: HTMLElement;
  }

  interface PointerEvent {
    target: HTMLElement;
  }

  interface InputEvent {
    target: HTMLElement;
  }

  interface HTMLElementEventMap
    extends Record<`${KeyboardEventName}.${Key}`, KeyboardEvent> {
    input: InputEvent;
  }
}

type KeyboardEventName = 'keydown' | 'keyup';

type Key = 'space' | 'enter' | 'escape';
