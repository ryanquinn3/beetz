import {Pipe, PipeTransform } from 'angular2/core';


@Pipe({name: 'commaize'})
export default class Commaize implements PipeTransform {
    transform(value: number): string {
        return commaize(value);
    }
}

function commaize(num: number): string {
    if (num === undefined || !num) return '';
    return num.toString()
        .split("").reverse().join('') //Reverse String
        .match(/.{1,3}/g) //Split out sets of 3
        .join(',') // Insert commas
        .split('').reverse().join(''); //reverse back
}