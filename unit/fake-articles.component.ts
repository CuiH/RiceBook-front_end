import { Component, EventEmitter, Output } from '@angular/core';


@Component({
	selector: 'app-articles',
	template: '<div class="fake-articles"></div>',
})
export class FakeArticlesComponent {

	@Output()
	private onSetFollowingsCount = new EventEmitter<number>();


	constructor() {	}

}
