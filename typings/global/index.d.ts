export {};

declare global {
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
