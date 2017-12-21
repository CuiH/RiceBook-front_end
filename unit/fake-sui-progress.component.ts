import { Directive, Input } from '@angular/core';


@Directive({
	selector: 'sui-progress',
})
export class FakeSuiProgressComponent {

	@Input()
	private value: any;


	constructor() {	}

}
