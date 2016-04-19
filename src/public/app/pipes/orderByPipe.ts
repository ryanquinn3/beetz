import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
  name: 'orderBy',
})

class OrderByPipe implements PipeTransform {
  public transform(array: Array<any>, args?: Array<string>): Array<any> {

    if (array) {

      let orderByValue: string = args[0];
      let byVal: number = 1;

      if (orderByValue.charAt(0) === '!') {
        byVal = -1;
        orderByValue = orderByValue.substring(1);
      }

      array.sort( (a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1 * byVal;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1 * byVal;
        } else {
          return 0;
        }
      });
      return array;
    }
  }
}

export { OrderByPipe };
