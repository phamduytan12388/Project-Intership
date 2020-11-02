import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HideButtonDirective{


  constructor(private el: ElementRef) { }

  @Input('appHighlight') check: boolean
  
  @HostListener('click') onClick() {
    this.hideButton(this.check);
  }
  
  private hideButton(check: boolean){
    this.el.nativeElement.hidden = check;
    // document.getElementById("test").hidden = check;
  }

  
}
