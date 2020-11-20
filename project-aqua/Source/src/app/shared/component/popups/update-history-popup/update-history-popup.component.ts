import { Component, OnInit, Input } from '@angular/core';
import { WorkNotebookService } from 'src/app/shared/services/work-notebook.service';
import { WorkNoteBookHistory } from 'src/app/shared/models/work-notebook/work-notebook.history.model';

@Component({
  selector: 'app-update-history-popup',
  templateUrl: './update-history-popup.component.html',
  styleUrls: ['./update-history-popup.component.scss'],
})
export class UpdateHistoryPopupComponent implements OnInit {
  @Input() id: string;
  historyData: WorkNoteBookHistory[] = [];
  pageIndex = 1;
  pageSize = 5;
  constructor(private workNotebookService: WorkNotebookService) { }

  ngOnInit(): void {
    this.workNotebookService.getItemHistories(this.id).subscribe(res => {
      this.historyData = res.sort((a, b) => b.modifiedAt - a.modifiedAt);
    });
  }

  renderIndex(index: number): number {
    return index + this.pageSize * (this.pageIndex - 1) + 1;
  }
}
