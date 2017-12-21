import { ValidatorFn, AbstractControl, NG_VALIDATORS, Validator, Validators } from '@angular/forms';
import { Directive, OnChanges } from '@angular/core';


// check the age a the user is over a number
function validatePassword(): ValidatorFn {
	return (control: AbstractControl): {[key: string]: any} => {
		let pwd = control.value;

		let pwd_cfm = control.root.get("pwd").value;

		return pwd === pwd_cfm ? null : {'invalidPassword': {value: control.value}}
	};
}

@Directive({
	selector: '[validPassword]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true }
	]
})
export class PasswordValidator implements Validator {

	private valFn = Validators.nullValidator;

	constructor() {
		this.valFn = validatePassword();
	}

	validate(control: AbstractControl): {[key: string]: any} {
		return this.valFn(control);
	}

}
