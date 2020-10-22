import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private data: DataService, private router: Router) { }

  canActivate(): boolean{
    if(!this.data.isCanActivate()){
        this.router.navigate(['/login']);
        return false;
    }
    return true;
}

}
