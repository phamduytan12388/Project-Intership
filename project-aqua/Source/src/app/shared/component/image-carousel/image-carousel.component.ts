import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileData } from '../../models/master-data/file-data.model';
import { WorkNotebookService } from '../../services/work-notebook.service';
import { WorkNoteBook } from '../../models/work-notebook/work-notebook.model';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent implements OnInit {
  @Input() imageUrlArray: string[];
  @Input() workNoteBook: WorkNoteBook;
  @Input() indexOfImage;
  @Output() closed = new EventEmitter<boolean>();
  slideIndex = 1;
  i = 0;
  isShow;
  constructor(
    private workNotebookService: WorkNotebookService
  ) { }

  ngOnInit(): void {
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.closed.emit(true);
      }
    });
    document.addEventListener('keyup', e => {
      if (e.keyCode === 37) {
        this.prevButton();
      }
    });
    document.addEventListener('keyup', e => {
      if (e.keyCode === 39) {
        this.nextButton();
      }
    });
    this.i = this.indexOfImage || 0;
    this.showOneImage(this.i);
  }
  prevButton(): void {
    if (this.isShow > 0) {
      this.isShow -= 1;
      this.showOneImage(this.isShow);
    } else {
      this.isShow = this.imageUrlArray.length - 1;
    }
  }
  nextButton(): void {
    if (this.isShow < this.imageUrlArray.length - 1) {
      this.isShow += 1;
      this.showOneImage(this.isShow);
    } else {
      this.isShow = 0;
    }
  }
  showOneImage(i): void {
    this.isShow = i;
  }
  closeView(): void {
    this.closed.emit(true);
  }
  preventDefault(e): void {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }
  viewCurrentImage(index): void {
    this.isShow = index;
  }

  deletePicture(index: number): void {
    const requestModel = {
      workId: this.workNoteBook.id,
      picture: this.workNoteBook.pictures[index],
    }
    this.workNotebookService.removePicture(requestModel).subscribe(_ => {
      this.imageUrlArray.splice(index, 1);
      this.workNoteBook.pictures.splice(index, 1);
    })
  }
}
