import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/serivice/data.service';
import { User } from 'src/app/shared/model/user.class';
import { ETypeForm } from 'src/app/shared/constant/type-form';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private data: DataService, private route: ActivatedRoute) { }
  public userCurrent = new User();
  typeForm = ETypeForm;

  ngOnInit(): void {
  }
  
}
