import { ValidatorFn, AbstractControl, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { Directive } from '@angular/core';


// check the age a the user is over a number
function validateAge(age: number): ValidatorFn {
	return (control: AbstractControl): {[key: string]: any} => {
		let birthDate = control.value;

		if (birthDate == "") return null;

		let user = new Date(birthDate);
		if (user.toDateString() !== "Invalid Date") {
			let now = new Date();
			let yearDiff = now.getFullYear() - user.getUTCFullYear();
			if (yearDiff > age
				|| (yearDiff == age && (now.getMonth() > user.getUTCMonth()
				|| (user.getUTCMonth() == now.getMonth() && now.getDate() > user.getUTCDate())))) {

				return null;
			}
		}

		return {'invalidAge': {value: control.value}};
	};
}

@Directive({
	selector: '[validAge]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: AgeValidator, multi: true }
	]
})
export class AgeValidator implements Validator {

	private validator: ValidatorFn;

	constructor() {
		this.validator = validateAge(18);
	}

	validate(c: FormControl) {
		return this.validator(c);
	}

}
