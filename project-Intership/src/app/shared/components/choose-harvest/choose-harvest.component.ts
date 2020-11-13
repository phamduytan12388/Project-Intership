import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Forest } from '../../model/forest';
import { ForestPlots } from '../../model/forestPlot';
import { DataService } from '../../serivice/data.service';
import { ForestPlotTree } from '../../model/forestPlot';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-choose-harvest',
  templateUrl: './choose-harvest.component.html',
  styleUrls: ['./choose-harvest.component.scss']
})
export class ChooseHarvestComponent implements OnInit {
  @Input() usedId?: Set<string>;
  @Input() forestList: Forest;

  public forest: Forest;
  public forestPlotTreeList: ForestPlotTree[] = [];
  public province: string;
  public forestPlotList: ForestPlots[] = [];
  public setOfCheckedId = new Set<string>();
  public checkedAll = false;
  public isVisible = true;

  constructor(
    private dataService: DataService,
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {
    // forkJoin(
    //   this.dataService.getForest(),
    // ).subscribe(([res1]) => {
    //   this.forest = res1;
    //   this.province = this.forest.forestOwner.province.value;
    //   this.forestPlotList = this.forest.forestPlots;
    //   this.forestPlotList.forEach(o => {
    //     o.trees.forEach(i => {
    //       this.forestPlotTreeList.push(i);
    //     });
    //   });
    // });

    this.province = this.forestList.forestOwner.province.value;
    this.forestPlotList = this.forestList.forestPlots;
    this.forestPlotList.forEach(o => {
      o.trees.forEach(i => {
        this.forestPlotTreeList.push(i);
      });
    });

  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.forestPlotTreeList = this.forestPlotTreeList.filter(o =>
      !this.usedId.has(o.id)
    );
    this.checkedAll = this.forestPlotTreeList.every(({ id }) => this.setOfCheckedId.has(id));
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onAllChecked(checked: boolean): void {
    this.forestPlotTreeList.forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  clickNextModal(): void {
    this.modal.destroy({ list1: this.setOfCheckedId, list2: this.forestPlotList, province: this.province });
  }
}
