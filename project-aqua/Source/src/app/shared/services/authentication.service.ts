declare var window: any;
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationModel } from '../models/auth/authentication.model';
import { CryptoUtil } from '../helpers/crypto.helper';
import { localStorageKey } from 'src/app/app.config';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { BaseService } from './base.service';

@Injectable()
export class AuthenticationService extends BaseService implements CanActivate {
  public accessToken: string;
  constructor(private httpClient: HttpClient, private router: Router) {
    super(httpClient);
  }

  public login(usernameOrEmail: string, password: string): Observable<any> {
    const hashPassword = CryptoUtil.hashMessage(password);
    const { timestamp, signature } = CryptoUtil.generateSignature(
      usernameOrEmail + password
    );
    // TODO open when implemented
    return this.post<AuthenticationModel>('api/login', {
      username: usernameOrEmail,
      password: hashPassword,
      timestamp,
      signature
    });
  }

  public setAuthenticationModel(authenticationModel: AuthenticationModel): string {
    return (window.localStorage[localStorageKey] = JSON.stringify(
      authenticationModel
    ));
  }

  public getAuthenticationModel(): AuthenticationModel {
    if (!window.localStorage[localStorageKey]) {
      return null;
    }
    try {
      return JSON.parse(window.localStorage[localStorageKey]);
    } catch (error) {
      return null;
    }
  }

  public logOut(): void {
    localStorage.removeItem(localStorageKey);
    this.router.navigate(['/auth']);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.getAuthenticationModel()) {
      return true;
    }
    this.router.navigate(['/auth'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
