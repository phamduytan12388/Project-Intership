import { Directive, HostListener } from '@angular/core';
const specialCharacters = ['-'];
@Directive( {
  selector: '[appInputTax]'
} )
export class InputTaxDirective {

  constructor () { }

  getKey( e: KeyboardEvent ) {
    return e.keyCode || e.charCode;
  }

  getCharCode( e: KeyboardEvent ) {
    return e.charCode || e.keyCode || e.which;
  }

  @HostListener( 'keypress', ['$event'] )
  onKeyPress( e: KeyboardEvent ) {

    if ( e.ctrlKey || e.altKey ) {
      return;
    }

    const k = this.getKey( e );

    const c = this.getCharCode( e );
    const cc = String.fromCharCode( c );
    let ok = true;

    ok = /[\d\.]/.test( cc );

    if ( !specialCharacters.includes( cc ) && !ok ) {
      e.preventDefault();
    }
  }
}
