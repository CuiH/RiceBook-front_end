import { Directive, Input } from '@angular/core';


@Directive({
	selector: '[queryParams]'
})
export class FakeQueryParamsDirective {

	@Input('queryParams') params: any;

}
