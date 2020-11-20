import { Directive, Renderer2, ElementRef, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[appShowMore]'
})
export class ShowMoreDirective implements AfterViewChecked {

  constructor(private renderer: Renderer2, private hostElement: ElementRef) {
    renderer.addClass(hostElement.nativeElement, 'show-more--content');
    const btn = document.createElement('span');
    btn.innerHTML = 'Xem thêm';
    btn.classList.add('show-more--btn');
    btn.addEventListener('click', this.showMore.bind(btn));
    renderer.appendChild(hostElement.nativeElement, btn);
  }

  ngAfterViewChecked(): void {
    if (this.hostElement.nativeElement.offsetHeight === this.hostElement.nativeElement.scrollHeight) {
      this.hostElement.nativeElement.children[0].classList.add('d-none');
    } else {
      this.hostElement.nativeElement.children[0].classList.remove('d-none');
    }
  }

  showMore(e) {
    e.target.parentElement.classList.remove('show-more--content');
    e.target.classList.add('d-none');
  }

}
