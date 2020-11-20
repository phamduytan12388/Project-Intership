import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import Utils from 'src/app/shared/helpers/utils.helper';

@Component({
  selector: 'app-create-password-popup',
  templateUrl: './create-password-popup.component.html',
  styleUrls: ['./create-password-popup.component.scss']
})
export class CreatePasswordPopupComponent implements OnInit {
  @Input() password: string;
  public isCopied = false;
  constructor(private modal: NzModalRef) { }

  ngOnInit(): void {
  }
  closePopupNo(): void {
    this.modal.destroy({
      data: {
        isSuccess: false,
      }
    });
  }

  closePopupYes(): void {
    this.modal.destroy({
      data: {
        isSuccess: true,
        password: this.password
      }
    });
  }
  copyToClipboard(event: MouseEvent): void {
    event.preventDefault();
    if (!this.password) {
      return;
    }
    const range = document.createRange();
    range.selectNodeContents(document.body);
    document.getSelection().addRange(range);
    const listener = (e: ClipboardEvent) => {
      const clipboard = e.clipboardData || window['clipboardData'];
      clipboard.setData('text', this.password.toString());
      e.preventDefault();
    };
    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);
    document.getSelection().removeAllRanges();
    this.modal.destroy({
      data: {
        isSuccess: true,
        password: this.password
      }
    });
  }

}
