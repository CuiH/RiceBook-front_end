import { Directive, Input } from '@angular/core';


@Directive({
	selector: '[uploader]'
})
export class FakeUploaderDirective {

	@Input('uploader') uploader: any;

}
