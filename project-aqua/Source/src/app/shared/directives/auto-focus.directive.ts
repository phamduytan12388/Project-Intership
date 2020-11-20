import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[autoFocus]'
})
export class AutoFocusDirective implements AfterViewInit{

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    // window.setTimeout(() => {
      this.el.nativeElement.focus();
    // });
  }

}
