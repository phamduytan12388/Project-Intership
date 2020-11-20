import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormatNumberPipe } from '../pipes/format-number.pipe';
import { NzNotificationService } from 'ng-zorro-antd';

@Directive({
  selector: '[appInputNumber]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '(blur)': 'formatInputValue($event.target.value)',
    '(focus)': 'formatToNumber($event.target.value)',
    '(paste)': 'pasteNumber($event)'
  }
})
export class InputNumberDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngControl: NgControl,
    private formatNumberPipe: FormatNumberPipe,
    private notification: NzNotificationService
  ) {
    this.renderer.setAttribute(this.el.nativeElement, 'onkeypress', 'return ((event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46)');
    this.renderer.setAttribute(this.el.nativeElement, 'maxlength', '17');
  }

  // tslint:disable-next-line:typedef
  @HostListener('keypress') onkeypress(e) {
    const event = e || window.event;
    const value: any = this.el.nativeElement.value.replace(/[^0-9\.]/g, '');
    if (
      (event.which !== 46 || value.indexOf('.') !== -1) &&
      (event.which < 48 || event.which > 57)
    ) {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.ngControl.valueAccessor.writeValue(this.formatNumberPipe.transform(this.ngControl.value));
  }

  formatInputValue(value): void {
    this.ngControl.valueAccessor.writeValue(this.formatNumberPipe.transform(value));
  }

  formatToNumber(value): void {
    this.ngControl.valueAccessor.writeValue(value === '0' ? '' : this.formatNumberPipe.parse(value));
  }

  pasteNumber(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData;
    // || window.clipboardData;
    const pastedText = clipboardData.getData('text');
    if (Number.isInteger(+pastedText)) {
      return;
    }
    if (pastedText.split('.').length > 2) {
      this.stopPaste(event);
      return;
    }
    if (pastedText.split('.').length === 1) {
      pastedText.split(',').forEach((item, index) => {
        if (index === 0) {
          if (Number.isInteger(+item)) {
            return;
          } else {
            this.stopPaste(event);
            return;
          }
        }
        if (index !== 0) {
          if (Number.isInteger(+item) && item.length === 3) {
            return;
          } else {
            this.stopPaste(event);
            return;
          }
        }
      });
    }
    if (pastedText.split('.').length === 2) {
      const origin = pastedText.split('.')[0];
      const decimal = pastedText.split('.')[1];
      if (!Number.isInteger(+decimal)) {
        this.stopPaste(event);
        return;
      }
      origin.split(',').forEach((item, index) => {
        if (index === 0) {
          if (Number.isInteger(+item)) {
            return;
          } else {
            this.stopPaste(event);
            return;
          }
        }
        if (index !== 0) {
          if (Number.isInteger(+item) && item.length === 3) {
            return;
          } else {
            this.stopPaste(event);
            return;
          }
        }
      });
    }
  }

  stopPaste(event: ClipboardEvent) {
    this.notification.error('Thông báo', 'Số liệu nhập không phải kiểu số');
    event.preventDefault();
  }

}
