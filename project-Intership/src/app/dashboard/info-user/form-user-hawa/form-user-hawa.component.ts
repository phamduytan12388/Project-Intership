import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/serivice/data.service';
import { UserDetailHawa } from 'src/app/shared/model/user-detail-hawa';
import { UserLoginHawa } from 'src/app/shared/model/user-login-hawa';
import { Masterdata, Masterdatas } from 'src/app/shared/model/masterdata';
import { AddressMasterdata } from 'src/app/shared/model/address-masterdata';
import { stringify } from 'querystring';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { empty } from 'rxjs';


@Component({
  selector: 'app-form-user-hawa',
  templateUrl: './form-user-hawa.component.html',
  styleUrls: ['./form-user-hawa.component.scss']
})
export class FormUserHawaComponent implements OnInit {
  public fgUserHawa: FormGroup;
  public userDetailHawa: UserDetailHawa = new UserDetailHawa();
  public userLoginHawa: UserLoginHawa = new UserLoginHawa();
  public supplyChainList: Masterdatas[] = [];
  public forestOwnerTypeList: Masterdata[] = [];
  public allProvinceList: AddressMasterdata[] = [];
  public allDistrictceList: AddressMasterdata[] = [];
  public allWardList: AddressMasterdata[] = [];
  public provinceList: AddressMasterdata[] = [];
  public districtceList: AddressMasterdata[] = [];
  public wardList: AddressMasterdata[] = [];
  public exam: AddressMasterdata;
  public address: string = '';
  constructor(private dataService: DataService,
    private formBuilder: FormBuilder) { }

  get getAddress() {
    console.log(this.fgUserHawa.getRawValue().fullName + this.fgUserHawa.getRawValue().coCode);
    this.address = '';
    if (this.fgUserHawa.getRawValue().street)
      this.address += this.fgUserHawa.getRawValue().street;
    if (this.fgUserHawa.getRawValue().village)
      this.address += ', ' + this.fgUserHawa.getRawValue().village;
    if (this.allWardList.find(o => o.code == this.fgUserHawa.getRawValue().commune))
      this.address += ', ' + this.allWardList.find(o => o.code == this.fgUserHawa.getRawValue().commune).name;
    if (this.allDistrictceList.find(o => o.code == this.fgUserHawa.getRawValue().district))
      this.address += ', ' + this.allDistrictceList.find(o => o.code == this.fgUserHawa.getRawValue().district).name;
    if (this.allDistrictceList.find(o => o.code == this.fgUserHawa.getRawValue().province))
      this.address += ', ' + this.allDistrictceList.find(o => o.code == this.fgUserHawa.getRawValue().province).name;

    return this.address;
  }

  ngOnInit(): void {
    this.userLoginHawa = JSON.parse(localStorage.getItem('userLoginHawa'));
    forkJoin(
      this.dataService.getAddressMasterDataHawa(this.userLoginHawa.jwtToken),
      this.dataService.getUserLoginHawa(this.userLoginHawa.jwtToken),
      this.dataService.getMasterdataHawa(this.userLoginHawa.jwtToken)
    ).subscribe(([res1, res2, res3]) => {
      this.allProvinceList = res1.reduce((accumulator, currentValue) => { return accumulator.concat(currentValue.childs) }, []);
      this.allDistrictceList = this.allProvinceList.reduce((accumulator, currentValue) => { return accumulator.concat(currentValue.childs) }, [])
      this.allWardList = this.allDistrictceList.reduce((accumulator, currentValue) => { return accumulator.concat(currentValue.childs) }, []);
      this.userDetailHawa = res2;
      this.createForm();
      res3.forEach(e => {
        e.childs.forEach(p => this.forestOwnerTypeList.push(p));
      });
      this.districtceList = this.allProvinceList.find(m => m.code === this.userDetailHawa.province.code).childs;
      this.wardList = this.districtceList.filter(m => m.code === this.userDetailHawa.district.code).reduce((accumulator, currentValue) => { return accumulator.concat(currentValue.childs) }, []);

    })

    
    // this.userLoginHawa = JSON.parse(localStorage.getItem('userLoginHawa'));
    // this.dataService.getAddressMasterDataHawa(this.userLoginHawa.jwtToken).subscribe(e => {
    //   this.allProvinceList = e.reduce((accumulator, currentValue) => { return accumulator.concat(currentValue.childs) }, []);
    //   this.allDistrictceList = this.allProvinceList.reduce((accumulator, currentValue) => { return accumulator.concat(currentValue.childs) }, [])
    //   this.allWardList = this.allDistrictceList.reduce((accumulator, currentValue) => { return accumulator.concat(currentValue.childs) }, [])
    // });

    // this.dataService.getUserLoginHawa(this.userLoginHawa.jwtToken).subscribe(el => {
    //   this.userDetailHawa = el;
    //   this.createForm();
    //   this.dataService.getMasterdataHawa(this.userLoginHawa.jwtToken).subscribe(o => {
    //     o.forEach(e => {
    //       e.childs.forEach(p => this.forestOwnerTypeList.push(p));
    //     });

    //     // this.forestOwnerTypeList = o.reduce((accumulator, currentValue) => {return accumulator.concat(currentValue.childs)}, [])
    //   });
    //   this.districtceList = this.allProvinceList.find(m => m.code === this.userDetailHawa.province.code).childs;
    //   this.wardList = this.districtceList.filter(m => m.code === this.userDetailHawa.district.code).reduce((accumulator, currentValue) => { return accumulator.concat(currentValue.childs) }, []);


    //   // this.supplyChainList.map(o => this.supplyChainChildList.push(o.childs));
    // })

  }

  ChangeProvinceList(code: string){
    this.districtceList = this.allProvinceList.find(m => m.code == code).childs;
    this.wardList = this.districtceList.reduce((accumulator, currentValue) => { return accumulator.concat(currentValue.childs) }, []);
  }

  ChangeDistrictList(code: string){
    this.wardList = this.districtceList.find(m => m.code == code).childs;
  }

  getValue(option) {
    this.districtceList = this.allProvinceList.find(m => m.code == option.value).childs;
    this.wardList = this.districtceList.filter(m => m.code === this.userDetailHawa.district.code).reduce((accumulator, currentValue) => { return accumulator.concat(currentValue.childs) }, []);
  }

  mapAddress(AddressMaster: AddressMasterdata[], myAddressList: AddressMasterdata[],) {
    AddressMaster.map(o => {
      let item: AddressMasterdata = new AddressMasterdata();
      item.id = o.id;
      item.code = o.code;
      item.name = o.name;
      item.type = o.type;
      item.parentId = o.parentId;
      item.childs = o.childs;
      myAddressList.push(item);
    })
  }


  createForm() {
    this.fgUserHawa = this.formBuilder.group({
      coCode: this.userDetailHawa.coCode,
      forestOwnerType: this.userDetailHawa.forestOwnerType && this.userDetailHawa.forestOwnerType.code,
      fullName: this.userDetailHawa.fullName,
      cellphoneNumber: this.userDetailHawa.cellphoneNumber,
      identityCard: this.userDetailHawa.identityCard,
      identityCardIssuedDate: this.userDetailHawa.identityCardIssuedDate  * 1000,
      province: this.userDetailHawa.province.code,
      district: this.userDetailHawa.district.code,
      commune: this.userDetailHawa.commune.code,
      village: this.userDetailHawa.village,
      street: this.userDetailHawa.street,
    });
  }

}