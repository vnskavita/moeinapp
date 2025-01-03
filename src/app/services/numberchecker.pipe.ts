import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'NumberChecker' })
export class NumberCheckerPipe implements PipeTransform {

  constructor() { }

  transform(value: any): boolean {

    if (typeof value === 'string') {
      // Try to parse the string into a number
      const parsedValue = parseFloat(value);

      // Check if the parsed value is a valid number and not NaN
      return !isNaN(parsedValue) && typeof parsedValue === 'number';
    }

    return typeof value === 'number';
  }
}


