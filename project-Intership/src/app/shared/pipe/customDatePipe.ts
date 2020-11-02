import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'tanDatePipe' })
export class TanDatePipe implements PipeTransform {
  transform(date: Date, format: string = 'yyyy-MM-dd'): string {
    date = new Date(date);  // if orginal type was a string
    date.setDate(date.getDate());
    return new DatePipe('en-US').transform(date, format);
  }
}