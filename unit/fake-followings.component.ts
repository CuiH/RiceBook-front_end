import { Component, Output, EventEmitter } from '@angular/core';


@Component({
	selector: 'app-followings',
	template: '<div class="fake-followings"></div>',
})
export class FakeFollowingsComponent {

	@Output()
	private onFollow = new EventEmitter<string>();

	@Output()
	private onUnfollow = new EventEmitter<string>();


	constructor() { }

}
