import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent implements OnInit {
  @Input() imageId?: string[];
  @Input() id?: string;
  @Output() closed = new EventEmitter<boolean>();
  public url = 'http://hawadevapi.bys.vn/api/file/';
  public page = 1;
  constructor(
  ) { }

  ngOnInit(): void {
    this.clickMiniImage(this.id);
  }

  closeComponent(): void {
    this.closed.emit(true);
  }

  clickButtonLeft(): void {
    const index: number = this.imageId.indexOf(this.id);
    if (index - 1 !== -1) {
      this.id = this.imageId[index - 1];
      this.page = index;
    }
    else {
      this.id = this.imageId[this.imageId.length - 1];
      this.page = this.imageId.length;
    }
  }

  clickButtonRight(): void {
    const index: number = this.imageId.indexOf(this.id);
    if (index + 1 < this.imageId.length) {
      this.id = this.imageId[index + 1];
      this.page = index + 2;

    }
    else {
      this.id = this.imageId[0];
      this.page = 1;
    }
  }

  clickMiniImage(id: string): void {
    const index: number = this.imageId.indexOf(id);
    this.id = id;
    this.page = index + 1;
  }

}
