import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzModalService } from 'ng-zorro-antd/modal';
import { forkJoin } from 'rxjs';
import { ChooseHarvestComponent } from 'src/app/shared/components/choose-harvest/choose-harvest.component';
import { Forest } from 'src/app/shared/model/forest';
import { ForestPlots } from 'src/app/shared/model/forestPlot';
import { HarvestForest, ItemTrees } from 'src/app/shared/model/harvest-forest';
import { HarvestForestFilter } from 'src/app/shared/model/harvest-forest-filter';
import { HarvestForestView } from 'src/app/shared/model/harvest-forest-view';
import { Masterdata } from 'src/app/shared/model/masterdata';
import { UserDetailHawa } from 'src/app/shared/model/user-detail-hawa';
import { UserLoginHawa } from 'src/app/shared/model/user-login-hawa';
import { DataService } from 'src/app/shared/serivice/data.service';
import { FormUserHawaComponent } from '../../info-user/form-user-hawa/form-user-hawa.component';

@Component({
  selector: 'app-haverst-registration-view',
  templateUrl: './haverst-registration-view.component.html',
  styleUrls: ['./haverst-registration-view.component.scss']
})
export class HaverstRegistrationViewComponent implements OnInit {
  public fgHaverstRegistration: FormGroup;
  public userDetailHawa: UserDetailHawa = new UserDetailHawa();
  public userLoginHawa: UserLoginHawa = new UserLoginHawa();
  public harvestMethodList: Masterdata[] = [];
  public harvestForestTypeList: Masterdata[] = [];
  public radioValue = 'A';
  public fromDate = new Date();
  public toDate: Date | null = null;
  public forestPlotList: ForestPlots[] = [];
  public setOfCheckedId = new Set<string>();
  public forestList = new Forest();
  public viewHarvestForest = new HarvestForestView();
  public viewForest = new Forest();
  public province = '';
  public objHarvestForest = new HarvestForest();
  public itemTree: ItemTrees;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.radioValue = 'A';
    const harvestForestID = this.activatedRoute.snapshot.params.id;


    forkJoin(
      this.dataService.getHarvestMethodHawa(),
      this.dataService.getDeclareHarvestByID(harvestForestID)
    ).subscribe(([res1, res2]) => {
      res1.forEach(e => {
        if (e.groupName === 'HarvestMethod') {
          e.childs.forEach(p => this.harvestMethodList.push(p));
        }
        if (e.groupName === 'HarvestForestType') {
          e.childs.forEach(p => this.harvestForestTypeList.push(p));
        }
      });

      this.viewHarvestForest = res2;
      if (this.viewHarvestForest) {
        this.viewHarvestForest.items.forEach(o => {
          this.setOfCheckedId.add(o.forestPlotTreeId);
        });
        if (this.viewHarvestForest.forestId) {
          this.dataService.getForestByID(this.viewHarvestForest.forestId).subscribe(res3 => {
            this.viewForest = res3;
            this.forestPlotList = res3.forestPlots;
            this.province = res3.forestOwner.province.value;
            this.createForm();
          });
        }
      }

      // this.createForm();
    });
  }

  disabledNowDate = (date: Date): boolean => {
    const nowDate = new Date();
    if (!date || !nowDate) {
      return false;
    }
    return date.getTime() < (nowDate.getTime() - (1000 * 60 * 60 * 24));
  }

  disabledStartDate = (fromDate: Date): boolean => {
    if (!fromDate || !this.toDate) {
      return false;
    }
    return fromDate.getTime() > this.toDate.getTime();
  }

  disabledEndDate = (toDate: Date): boolean => {
    if (!toDate || !this.fromDate) {
      return false;
    }
    return toDate.getTime() <= this.fromDate.getTime();
  }

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  showModal1(): void {
    const modal = this.modalService.create({
      nzContent: ChooseHarvestComponent,
      nzComponentParams: {
        usedId: this.setOfCheckedId,
        forestList: this.forestList
      },
    });

    modal.afterClose.subscribe(result => {
      [...result.list1].forEach(o => {
        this.setOfCheckedId.add(o);
      });

      this.forestPlotList = result.list2;
      this.province = result.province;
    });
  }

  deleteItem(id: string): void {
    this.setOfCheckedId.delete(id);
  }

  createForm(): void {
    this.fgHaverstRegistration = this.formBuilder.group({
      profileDate: new Date(this.viewHarvestForest.profileDate * 1000),
      profileID: { value: this.viewHarvestForest.profileCode, disabled: true },
      profileName: this.viewHarvestForest.profileName,
      createdBy: this.viewForest.forestOwner.fullNameUser, // { value: this.viewForest.forestOwner.fullNameUser, disabled: true },
      standingTreeTraditionId: { value: this.viewHarvestForest.standingTreeTraditionId, disabled: true },
      forestProfileID: { value: this.viewForest.profileCode, disabled: true },
      forestType: this.viewHarvestForest.forestType.code,
      check: this.radioValue,
      fromDate: new Date(this.viewHarvestForest.fromDate * 1000),
      toDate: new Date(this.viewHarvestForest.toDate * 1000),
      harvestMethod: this.viewHarvestForest.harvestMethod.code
    });
  }

  mappingHarvestForest(): HarvestForest {
    // this.objHarvestForest.profileDate = this.fgHaverstRegistration.getRawValue().profileDate;
    this.objHarvestForest.forestId = null;
    this.objHarvestForest.harvesterId = null;
    this.objHarvestForest.profileDate = Date.parse(this.fgHaverstRegistration.getRawValue().profileDate) / 1000;
    this.objHarvestForest.standingTreeTraditionId = null;
    this.objHarvestForest.profileName = this.fgHaverstRegistration.getRawValue().profileName;
    this.objHarvestForest.profileCreatedUserId = this.forestList.forestOwner.userId;
    this.objHarvestForest.fromDate = Date.parse(this.fgHaverstRegistration.getRawValue().fromDate) / 1000;
    this.objHarvestForest.toDate = Date.parse(this.fgHaverstRegistration.getRawValue().toDate) / 1000;
    this.objHarvestForest.harvestMethod = this.fgHaverstRegistration.getRawValue().harvestMethod;
    this.objHarvestForest.forestType = this.fgHaverstRegistration.getRawValue().forestType;
    this.objHarvestForest.items = [];
    this.forestPlotList.forEach(o => {
      o.trees.forEach(i => {
        if (this.setOfCheckedId.has(i.id)) {
          this.itemTree = new ItemTrees();
          this.itemTree.id = null;
          this.itemTree.forestPlotTreeId = i.id;
          this.itemTree.declareHarvestId = null;
          this.itemTree.area = i.area;
          this.itemTree.estimatedVolume = i.estimatedVolume;
          this.objHarvestForest.items.push(this.itemTree);
        }
      });
    });
    this.objHarvestForest.documents = [];
    this.objHarvestForest.isSend = false;

    return this.objHarvestForest;
  }

  saveHarvestForest(): void {
    this.mappingHarvestForest();
    this.dataService.CreateHarvestForest(this.objHarvestForest).subscribe(o => {
      console.log(o);
    });
  }

  changeScreeenList(): void {
    this.router.navigate(['/dashboard/profile-management/haverst-registration-list']);
  }
}
