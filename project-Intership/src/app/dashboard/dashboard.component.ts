import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../shared/serivice/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public color: string;
  public check: boolean;
  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getHeader(JSON.parse(window.localStorage.getItem('userLoginHawa')).jwtToken);
    this.dataService.getRole()
      .subscribe(res1 => {
        this.dataService.role$.next(res1);
        console.log('call API role');
      });
  }

  changeHaverst(): void {
    this.router.navigate(['/dashboard/profile-management/haverst-registration']);
  }

  changeHaverstList(): void {
    this.router.navigate(['/dashboard/profile-management/haverst-registration-list']);
  }

  changeForm(): void {
    this.router.navigate(['/dashboard/info-user/form-user']);
  }
}
