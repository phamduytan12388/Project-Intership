import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { ETypeForm } from 'src/app/type-form/const';
import { User } from 'src/app/employee/model/user.class';

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
