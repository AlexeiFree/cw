import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { LOG_COLOR_DEFAULT } from './constants';
import { Logger } from './logger';
import { createLogStyle } from './utils';

describe('Logger', () => {
  let logger: Logger;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), Logger],
    });

    logger = TestBed.inject(Logger);
  });

  it('method log should log to console passed text with default color', () => {
    spyOn(console, 'log');

    const logText = 'Some log';

    logger.log(logText);

    expect(console.log).toHaveBeenCalledWith(
      `%c${logText}`,
      createLogStyle(LOG_COLOR_DEFAULT),
    );
  });

  it('method log should log to console passed text with passed color', () => {
    spyOn(console, 'log');

    const logText = 'Some log';
    const logColor = 'red';

    logger.log(logText, logColor);

    expect(console.log).toHaveBeenCalledWith(
      `%c${logText}`,
      createLogStyle(logColor),
    );
  });
});
