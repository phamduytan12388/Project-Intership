import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import * as EXIF from 'src/assets/js/exif.js';

@Directive({
  selector: '[imgExif]'
})
export class ImgExifDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('load') onLoad() {
    const img = this.el.nativeElement;
    const renderer = this.renderer;
    EXIF.getData(this.el.nativeElement, function() {
      renderer.addClass(
        img,
        'orient-transform-' + EXIF.getTag(this, 'Orientation')
      );
    });
  }
}
