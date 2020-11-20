import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class ApplicationService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
  public initApp(): Observable<any> {
    const doAnything = new Observable(observer => {
      setTimeout(() => {
        observer.next();
        observer.complete();
      }, 1000);
    });
    return doAnything;
  }
}
