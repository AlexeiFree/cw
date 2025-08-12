import { Injectable } from '@angular/core';

import { LOG_COLOR_DEFAULT } from './constants';
import { createLogStyle } from './utils';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  public log(text: string, color = LOG_COLOR_DEFAULT): void {
    console.log(`%c${text}`, createLogStyle(color));
  }
}
