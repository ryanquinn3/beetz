import {Pipe, PipeTransform } from 'angular2/core';


@Pipe({name: 'commaize'})
class Commaize implements PipeTransform {
    public transform(value: number): string {
        if (value === undefined || !value) {
          return '';
        }
        return value.toString()
            .split('').reverse().join('') // Reverse String
            .match(/.{1,3}/g) // Split out sets of 3
            .join(',') // Insert commas
            .split('').reverse().join(''); // reverse back
      }
}
export default Commaize;