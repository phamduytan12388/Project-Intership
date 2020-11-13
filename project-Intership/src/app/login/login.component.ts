import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { DataService } from '../shared/serivice/data.service';
import { UserLogin } from 'src/app/shared/model/user-login';
import { User } from 'src/app/shared/model/user.class';
import { LoginRoutingModule } from './login-routing.module';
import * as CryptoJS from 'crypto-js';
import { UserHawa } from 'src/app/shared/model/user-hawa';
import { UserLoginHawa } from 'src/app/shared/model/user-login-hawa';
import { UserDetailHawa } from 'src/app/shared/model/user-detail-hawa';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public rfLogin: FormGroup;
  public userLogin = new UserLogin();
  public userLoginHawa = new UserLoginHawa();
  public userDetailHawa = new UserDetailHawa();
  public checkLogin = true;
  validationMessages = {
    required: 'Trường này là bắt buộc nhập',
    formatLogin: 'Định dạng tên đăng nhập chưa đúng',
    checkLogin: 'Tài khoản mật khẩu chưa đúng'
  };
  invalidMessages: string[] = [];
  formErrors = {
    username: '',
    password: ''
  };
  iconCamera = 'https://i.pinimg.com/originals/d4/bc/c4/d4bcc46e371e194b20854acd1ba3a86b.jpg';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit(): void {
    // this.data.getUserLoginData();
    this.createFrom();
    // console.log(this.crypto(password));
  }

  crypto(password: string): string {
    // var CryptoJS = require("crypto-js");  

    // const parsedSalt = CryptoJS.enc.Base64.parse(CryptoUtil.salt);
    const parsedSalt =
      CryptoJS.enc.Base64.parse('uGa5buIox4+fX4ViZ7p3TyR4cx5evpoBqFsE8dueBqheYs6faRQ1VxCr0oQ1hqXQGyjc8rKA5kWXjHMxAByt0Q==');
    const result = CryptoJS.PBKDF2(password, parsedSalt, {
      keySize: 64 / 4,
      iterations: 1000,
      hasher: CryptoJS.algo.SHA512
    });
    return CryptoJS.enc.Base64.stringify(result);
  }

  onSubmitForm(): void {
    this.userLogin = this.mappingModel(this.rfLogin.getRawValue());
    // localStorage.removeItem('userLogin');
    // if (this.validateForm() && this.checkLoginUsername()) {
    //   localStorage.setItem('userLogin', JSON.stringify(this.userLogin));
    //   this.router.navigate(['/employee/list']);
    // }
    this.userLogin.password = this.crypto(this.userLogin.password);
    this.data.postUserHawa(this.userLogin).subscribe(res => {
      localStorage.setItem('userLoginHawa', JSON.stringify(res));
      localStorage.setItem('jwtToken', JSON.stringify(res.jwtToken));
      this.data.getHeader(JSON.parse(window.localStorage.getItem('userLoginHawa')).jwtToken);

      // this.data.getUserLoginHawa(res.jwtToken).subscribe(el => {
      //   // this.userDetailHawa = el;
      //   console.log(el);
      //   localStorage.setItem('userDetailHawa', JSON.stringify(el));
      // })
      // localStorage.getItem('')
      this.router.navigate(['/dashboard']);
    });
  }

  createFrom(): void {
    this.rfLogin = this.fb.group({
      username: [this.userLogin.username],
      password: [this.userLogin.password]
    });
  }

  getInvalidMessages(
    form: FormGroup,
    formErrors: object): string[] {
    if (!form) { return; }
    const errorMessages = [];
    for (let field in formErrors) {
      formErrors[field] = '';
      const control = form.get(field);
      if (control && !control.valid) {
        for (const key in control.errors) {
          formErrors[field] += this.validationMessages[key] + '';
          break;
        }
      }
    }
    for (const key in formErrors) {
      if (formErrors.hasOwnProperty(key) && formErrors[key].length > 0) {
        errorMessages.push(formErrors[key]);
      }
    }
    return errorMessages;
  }

  validateForm(): boolean {
    this.invalidMessages = this.getInvalidMessages(
      this.rfLogin,
      this.formErrors
    );

    return this.invalidMessages.length === 0;
  }

  checkLoginUsername(): boolean {
    const username = this.userLogin.username;
    const password = this.userLogin.password;
    const check = (this.data.login(username, password));
    if ((username && password) && check)
      return this.checkLogin = true;
    else
      return this.checkLogin = false;
    ;
  }

  // userLoginCheck(control: AbstractControl): ValidationErrors | null {
  //   return (Array.isArray(control.value) && !control.value.length) ||
  //     (!Array.isArray(control.value) &&
  //       (control.value === '' ||
  //         control.value === null ||
  //         (typeof control.value === 'string' && control.value.trim() === '')))
  //     ? {
  //       userRequired: {
  //         valid: false
  //       }
  //     }
  //     : null;
  // }

  mappingModel(formValue: any): UserLogin {
    return {
      username: formValue.username,
      password: formValue.password,
    };
  }
}
