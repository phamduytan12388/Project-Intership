import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from '../serivice/data.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private data: DataService, private router: Router) { }

  canActivate(): boolean {
    if (!this.data.isCanActivate()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
