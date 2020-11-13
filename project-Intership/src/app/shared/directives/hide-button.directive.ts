import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DataService } from '../serivice/data.service';

@Directive({
  selector: '[appHighlight]'
})
export class HideButtonDirective implements OnInit {


  constructor(
    private el: ElementRef,
    private dataService: DataService
  ) { }

  @Input('appHighlight') check: boolean;


  // @HostListener('click') onClick(): void {
  //   this.hideButton(this.check);
  // }

  ngOnInit(): void {
    console.log('khoi tao directive');
    this.dataService.role$.subscribe(value => {
      if (value && (value.roles || []).some(o => o === 'HarvestedTimberSourceViewAllProfiles')) {
        this.el.nativeElement.hidden = false;
      }
      else {
        this.el.nativeElement.hidden = true;
      }
    });
  }

  // private hideButton(check: boolean): void {
  //   this.el.nativeElement.hidden =
  //   // document.getElementById("test").hidden = check;
  // }


}
