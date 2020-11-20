import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import CustomValidator from 'src/app/shared/helpers/custom-validator.helper';
import ValidationHelper from 'src/app/shared/helpers/validation.helper';
import { AuthenticationModel } from 'src/app/shared/models/auth/authentication.model';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  value;
  formLogin: FormGroup;
  formErrors = {
    email: '',
    password: '',
  };
  isSubmitted = false;
  invalidMessages: string[];
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.formLogin = this.fb.group({
      email: new FormControl(null, [CustomValidator.required]),
      password: new FormControl(null, [CustomValidator.required]),
    });
    this.formLogin.valueChanges.subscribe(data => {
      this.onFormValueChanged();
    });
  }



  validateForm(): boolean {
    this.invalidMessages = ValidationHelper.getInvalidMessages(
      this.formLogin,
      this.formErrors,
    );
    return this.invalidMessages.length === 0;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    // tslint:disable-next-line:forin
    if (this.validateForm()) {
      this.authenticationService
        .login(this.formLogin.value.email, this.formLogin.value.password)
        .subscribe(
          res => {
            this.authenticationService.setAuthenticationModel(
              res.data as AuthenticationModel
            );
            this.router.navigate(['dashboard']);
          },
          err => { }
        );

    }
  }

  onFormValueChanged(): void {
    if (this.isSubmitted) {
      this.validateForm();
    }
  }

}
