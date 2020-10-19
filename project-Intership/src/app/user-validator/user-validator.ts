import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export default class UserValidator{
    static userRequired (control: AbstractControl): ValidationErrors | null{
        return  (Array.isArray(control.value) && !control.value.length) ||
            (!Array.isArray(control.value) &&
            (control.value ==='' ||
                control.value === null ||
                (typeof control.value === 'string' && control.value.trim() === '')))
            ? {
                userRequired:{
                     valid: false
                }
            }
            : null;
    }
}