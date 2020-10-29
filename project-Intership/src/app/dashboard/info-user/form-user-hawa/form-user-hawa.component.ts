import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { UserDetailHawa } from 'src/app/employee/model/user-detail-hawa';

@Component({
  selector: 'app-form-user-hawa',
  templateUrl: './form-user-hawa.component.html',
  styleUrls: ['./form-user-hawa.component.scss']
})
export class FormUserHawaComponent implements OnInit {
  public fgUserHawa: FormGroup;
  public userDetailHawa: UserDetailHawa = new UserDetailHawa;
  constructor(private dataService: DataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userDetailHawa = JSON.parse(localStorage.getItem('userDetailHawa'));
    this.createForm();
  }

  createForm(){
    this.fgUserHawa = this.formBuilder.group({
      coCode: this.userDetailHawa.coCode,
      supplyChainTypes: this.userDetailHawa.supplyChainTypes,
      fullName: this.userDetailHawa.fullName,
      cellphoneNumber: this.userDetailHawa.cellphoneNumber,
      identityCard: this.userDetailHawa.identityCard,
      identityCardIssuedDate: this.userDetailHawa.identityCardIssuedDate,
      province: '',
      district: '',
      commune: '',
      village: this.userDetailHawa.village,
      street: this.userDetailHawa.street
    });
  }

}
