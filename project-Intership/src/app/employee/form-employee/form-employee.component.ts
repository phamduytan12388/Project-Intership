import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { User, WorkItem } from '../model/user.class';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ETypeForm } from 'src/app/type-form/const';
import { Work } from '../model/work';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss']
})
export class FormEmployeeComponent implements OnInit {
  @Input() id: string;
  @Input() type: string;
  public rfUser: FormGroup
  public works: FormArray;
  name$: BehaviorSubject<string> = new BehaviorSubject('');
  isSubmit: boolean;
  typeForm = ETypeForm;
  public user: User = new User();
  public work: Work = new Work();
  public userCurrentList: User[] = this.data.userList;
  defaultLink = 'data:image/png;base64,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';
  iconCamera = 'https://cdn.onlinewebfonts.com/svg/img_411540.png';
  // Validate form
  invalidMessages: string[] = [];
  formErrors = {
    userName: '',
    userEmail: ''
  };
  validationMessages = {
    required: 'Trường này là bắt buộc nhập',
    email: 'Email không đúng định dạng',
    formatLogin: 'Định dạng tên đăng nhập chưa đúng'
  };
  constructor(private data: DataService,
    private router: Router
    , private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    if (this.type !== this.typeForm.create) {
      this.data.getDetailUserData(this.id).
        subscribe(res => {
          this.user = res;
          this.createForm();
          this.name$.pipe(
            debounceTime(100),
            distinctUntilChanged(),
          ).subscribe(query => this.validateForm());
        });
    }
    this.createForm();
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmitForm() {
    this.isSubmit = true;
    this.user = this.mappingModel(this.rfUser.getRawValue())
    if (this.validateForm()) {
      if (this.type === this.typeForm.edit) {
        // this.userCurrentList[(this.userCurrentList.findIndex(o => +o.id === +this.id))] = this.user;
        this.data.updateDetailUserData(this.id, this.user).subscribe(res => {
          console.log(res);
        });
      }
      if (this.type === this.typeForm.create) {
        // this.user.id = Math.max(...this.userCurrentList.map(i => +i.id), 0).toString() + 1;
        // this.data.userList.push(this.user);
        this.data.addDetailUserData(this.user).subscribe(res => {
          console.log(res);
        });
      }
      this.router.navigate(['/list']);
    }
  }

  onCancelForm(): void {
    this.rfUser.reset();
    this.router.navigate(['/list']);
  }

  // onResertForm(formUser: NgForm) {
  //   formUser.resetForm();
  //   this.router.navigate(['/list']);
  // }

  updateAvatar(event) {
    this.getBase64(event.target.files[0]).subscribe(res => {
      this.user.avatar = res;
    })
  }

  getBase64(file): Observable<any> {
    return new Observable(res => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        res.next(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    })

  }

  createForm(): void {
    this.rfUser = this.fb.group({
      userCheck: [this.user.userCheck, []],
      userName: [this.user.userName, [Validators.required]],
      userNo: [this.user.userNo, []],
      userBirthday: [this.user.userBirthday, []],
      userAmount: [this.user.userAmount, []],
      userEmail: [this.user.userEmail, [Validators.email]],
      userNation: [this.user.userNation, []],
      userMaritalStatus: [this.user.userEmail, []],
      userDesc: [this.user.userDesc, []],
      // works: this.fb.array(
      //   this.user.works.map(el => this.createWork(el)))
    });
    if (this.type === this.typeForm.view) {
      this.rfUser.disable();
    }
  }

  createWork(workItem: WorkItem): FormGroup {
    return this.fb.group({
      workName: workItem.work.workName,
      workDesc: workItem.work.workDesc,
      workItem: this.fb.array(
        workItem.workItem.map(el => this.createWork(el)))
    });
  }

  formatWorkArray(control: AbstractControl): FormArray {
    return (control as FormArray);
  }



  // addItem(): void {
  //   this.works = this.rfUser.get('works') as FormArray;
  //   this.works.push(this.createWork());
  //   console.log(this.rfUser.getRawValue().works);

  // }

  addItem(works: FormArray): void {
    const group = works;
    group.push(this.fb.group({
      workName: '',
      workDesc: '',
      workItem: this.fb.array([])
    }));
    console.log(this.rfUser);
  }

  deleteItem(works: any, i: number): void {
    const control = works;
    control.splice(i, 1);
  }

  // onAddHobby(){
  //   const control=new FormControl(null,Validators.required);
  //   (<FormArray>this.SignupForm.get('hobbies')).push(control);
  // }

  mappingModel(formValue: any): User {
    return {
      id: this.id,
      userName: formValue.userName,
      userNo: formValue.userNo,
      userBirthday: formValue.userBirthday,
      userAmount: formValue.userAmount,
      userEmail: formValue.userEmail,
      works: formValue.works,
      // userNation: formValue.userNation,
      // userMaritalStatus: formValue.userMaritalStatus,
      // userDesc: formValue.userDesc,
    }

  }

  checkErr(control: AbstractControl): string {
    if (!this.isSubmit) {
      return '';
    }
    switch (true) {
      case (control.errors?.minlength) ? true : false: {
        return 'Ít nhất có 5 ký tự';
      }
      case control.errors?.required: {
        return 'Trường này là bắt buộc';
      }
      case control.errors && control.errors.email: {
        return 'Email khong dung dinh dang';
      }
    }
  }

  validateForm(): boolean {
    this.invalidMessages = this.getInvalidMessages(
      this.rfUser,
      this.formErrors
    );
    return this.invalidMessages.length === 0;
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

  formAAA(event) {
    console.log(this.formatWorkArray(event.get('workItem')));
  }
}
