import { Pipe, PipeTransform } from '@angular/core';
const PADDING = '000000';
@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  private DECIMAL_SEPARATOR: string;
  private THOUSANDS_SEPARATOR: string;
  private CURRENCY_UNIT: string;
  constructor() {
    // TODO comes from configuration settings
    this.DECIMAL_SEPARATOR = '.';
    this.THOUSANDS_SEPARATOR = ',';
    this.CURRENCY_UNIT = '';
  }
  transform(
    value: number | string,
    fractionSize: number = 2,
    placeholder?: boolean
  ): string {
    if (!value) { return '0'; }
    if (isNaN(+value)) { return value.toString(); }

    let [integer, fraction = ''] = (+value).toString()
      .split(this.DECIMAL_SEPARATOR);

    if (value < 0.01) {
      return '0';
    }

    if (+(fraction + PADDING)[fractionSize] > 4) {
      fraction = fractionSize > 0
        ? this.DECIMAL_SEPARATOR + (
          (+(fraction + PADDING).substring(0, fractionSize) + 1) > 9 ?
            (+(fraction + PADDING).substring(0, fractionSize) + 1).toString() :
            '0' + (+(fraction + PADDING).substring(0, fractionSize) + 1).toString()
        ) : '';
    } else {
      if ((fraction + PADDING).substring(0, fractionSize) !== '00') {
        fraction = fractionSize > 0
          ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
          : '';
      } else {
        fraction = '';
      }
    }

    if (fraction.toString().length === (fractionSize + 2)) {
      integer = (+integer + 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
      fraction = this.DECIMAL_SEPARATOR + PADDING.substring(0, fractionSize);
    } else {
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
    }

    return integer + fraction + (integer && this.CURRENCY_UNIT);
  }
  parse(value: string): number {
    if (!isNaN(+value)) {
      return +value;
    }

    let integer = (value || '').replace(this.CURRENCY_UNIT, '');

    integer = integer.split(this.THOUSANDS_SEPARATOR).join('');

    return +integer;
  }

}
