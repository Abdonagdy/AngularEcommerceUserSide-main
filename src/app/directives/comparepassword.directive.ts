import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';


@Directive
({
selector: '[appComparepassword]',

})
export class ComparepasswordDirective implements Validator{

  constructor() { }
  @Input('appComparepassword') compareWith: string="";

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.root.get(this.compareWith);
    const confirmPassword = control.value;

    return password && password.value !== confirmPassword ? { compareWith: true } : null;
  }

}
