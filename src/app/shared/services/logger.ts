import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Logger {
  public log(text: string, color = '#000'): void {
    console.log(
      `%c${text}`,
      `color: ${color}; background-color: #f5f5f5; padding: 5px; line-height: 20px`,
    );
  }
}
