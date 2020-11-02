import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HideButtonDirective {


  constructor(private el: ElementRef) { }

  @Input('appHighlight') check: boolean;

  @HostListener('click') onClick(): void {
    this.hideButton(this.check);
  }

  private hideButton(check: boolean): void {
    this.el.nativeElement.hidden = check;
    // document.getElementById("test").hidden = check;
  }


}
