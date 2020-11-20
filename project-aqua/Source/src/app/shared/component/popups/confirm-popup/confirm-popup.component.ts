import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss']
})
export class ConfirmPopupComponent implements OnInit {
  @Input() title: string;
  @Input() engTitle: string;
  @Input() vnContent: string;
  @Input() eContent: string;
  @Input() okBtnTitle = 'ĐỒNG Ý';
  @Input() engOkBtnTitle =  '(AGREE)';
  @Input() cancelBtnTitle = 'KHÔNG';
  @Input() engCancelBtnTitle = '(NOT AGREE)';
  constructor(private modal: NzModalRef) {}

  ngOnInit() {}

  closePopupNo(): void {
    this.modal.destroy({ data: false });
  }

  closePopupYes(): void {
    this.modal.destroy({ data: true });
  }
}
