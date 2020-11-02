import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/serivice/data.service';
import { User } from 'src/app/shared/model/user.class';
import { ETypeForm } from 'src/app/shared/constant/type-form';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private data: DataService, private route: ActivatedRoute) { }
  public userCurrent = new User();
  id: number;
  typeForm = ETypeForm;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }
}
