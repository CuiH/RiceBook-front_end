import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FollowingService } from './following.service';
import { UserBrief } from '../main/user-brief';
import { Message } from '../message';
import { Editor } from '../editor';
import { HelperService } from '../helper.service';


@Component({
	selector: 'app-followings',
	templateUrl: './followings.component.html',
	styleUrls: ['./followings.component.css']
})
export class FollowingsComponent implements OnInit {

	// followings
	private followings: UserBrief[];

	// editors
	private newFollowingEditor: Editor;

	// error messages
	private followingError: Message;

	// dimmers
	private isRetrievingFollowings: boolean;

	@Output()
	private onFollow = new EventEmitter<string>();

	@Output()
	private onUnfollow = new EventEmitter<string>();


	constructor(
		private followingService: FollowingService
	) {
		this.followings = [];

		this.newFollowingEditor = new Editor("");

		this.followingError = new Message();

		this.isRetrievingFollowings = true;
	}

	ngOnInit() {
		// get all following briefs to display
		this.followingService.getCurrentUserFollowingBriefs()
			.then(followings => {
				this.isRetrievingFollowings = false;

				this.followings = followings.map(following => {
					following.avatar = HelperService.generateEditAvatarUrl(following.avatar, 'F');

					return following;
				});
			})
			.catch(err => {
				this.isRetrievingFollowings = false;

				this.displayError(err);
			});
	}

	// follow a user
	private follow(): void {
		if (!this.newFollowingEditor.value) return;

		this.isRetrievingFollowings = true;

		this.followingService.follow(this.newFollowingEditor.value)
			.then(user => {
				this.onFollow.emit(user._id);

				user.avatar = HelperService.generateEditAvatarUrl(user.avatar, 'F');

				// add to followings list
				this.followings.splice(0, 0, user);

				this.newFollowingEditor.value = "";

				this.isRetrievingFollowings = false;
				this.followingError.isShowing = false;
			})
			.catch(err => {
				this.isRetrievingFollowings = false;

				this.displayError(err);
			});
	}

	// unfollow a user
	private unfollow(following: UserBrief): void {
		this.isRetrievingFollowings = true;

		this.followingService.unfollow(following._id)
			.then(() => {
				this.onUnfollow.emit(following._id);

				// remove from followings list
				this.followings = this.followings.filter(f => f._id !== following._id);

				this.isRetrievingFollowings = false;
			})
			.catch(err => {
				this.isRetrievingFollowings = false;

				this.displayError(err);
			});
	}

	private displayError(err): void {
		this.followingError.isShowing = true;
		this.followingError.message = err;
	}

}
