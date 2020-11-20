import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReadingJsonService {
  constructor ( private http: HttpClient ) { }

  public getJSON( urlJson ): Observable<any> {
    return this.http.get( urlJson );
  }
}
