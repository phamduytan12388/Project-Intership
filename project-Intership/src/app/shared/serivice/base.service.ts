import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseData } from '../../response-data';
import { environment } from 'src/environments/environment';

export class BaseService {
  get apiEndpoint(): string {
    return 'http://hawaddsapi.bys.vn/';
  }
  constructor(public http: HttpClient) { }

  public get<T>(url: string, params?: any, headers?: any): Observable<any> {
    return this.http
      .get(this.apiEndpoint + url, { params, headers })
      .pipe(map((result: ResponseData<T>) => result.data as T));
  }

  public post<T>(url: string, data?: any, headers?: any): Observable<any> {
    return this.http
      .post(this.apiEndpoint + url, data, { headers })
      .pipe(map(result => result));
  }

  public put<T>(url: string, data: any, headers?: any): Observable<T> {
    return this.http
      .put(this.apiEndpoint + url, data, { headers })
      .pipe(map(result => result as T));
  }

  public patch<T>(url: string, data: any, headers?: any): Observable<T> {
    return this.http
      .patch(this.apiEndpoint + url, data, { headers })
      .pipe(map(result => result as T));
  }

  public delete<T>(url: string, data: any, headers?: any): Observable<T> {
    return this.http.request<T>('delete', this.apiEndpoint + url, {
      headers,
      body: data
    }).pipe(map(result => result as T));
  }

  public getDetail<T>(
    url: string,
    id: string,
    nameParam: string,
    headers?: any
  ): Observable<T> {
    const httpParams = new HttpParams().set(nameParam, id);
    return this.http
      .get(this.apiEndpoint + url, {
        headers,
        params: httpParams
      })
      .pipe(map(result => result as T));
  }

  public getImageArrayBuffer(url: string): Observable<any> {
    return this.http.get(this.apiEndpoint + url, {
      responseType: 'arraybuffer'
    });
  }

  public getBlod(url: string): Observable<any> {
    return this.http.get(this.apiEndpoint + url, {
      responseType: 'blob'
    });
  }

}