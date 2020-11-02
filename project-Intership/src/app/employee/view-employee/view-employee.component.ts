import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/serivice/data.service';
import { ETypeForm } from 'src/app/shared/constant/type-form';
import { User } from 'src/app/shared/model/user.class';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  constructor(private data: DataService, private route: ActivatedRoute) { }
  public userCurrent = new User();
  id: number;
  typeForm = ETypeForm;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }
}
