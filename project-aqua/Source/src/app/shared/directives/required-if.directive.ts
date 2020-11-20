import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';

@Directive({
  selector: '[appRequiredIf],[appRequiredIf][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: RequiredIfDirective, multi: true }
  ]
})
export class RequiredIfDirective implements Validator, OnChanges {
  @Input('appRequiredIf') required: boolean;
  private control;

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control) {
      this.control = control;
    }
    return this.required ? appRequiredIf(this.required)(control) : null;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.validate(this.control);
  }
}

export function appRequiredIf(required: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return required ? { required: true } : null;
  };
}
