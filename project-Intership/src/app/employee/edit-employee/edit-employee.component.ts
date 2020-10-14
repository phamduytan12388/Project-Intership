import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { User } from 'src/app/user.class';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  constructor(private data: DataService, private route: ActivatedRoute) { }
  public userCurrent = new User();
  id: number;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  }
}
