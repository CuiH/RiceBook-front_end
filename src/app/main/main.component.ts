import { Component, OnInit, ViewChild } from '@angular/core';

import { UserBrief } from './user-brief';
import { UserService } from '../user.service';
import { Editor } from '../editor';
import { ArticlesComponent } from '../articles/articles.component';
import { Message } from '../message';
import { HelperService } from '../helper.service';


@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	// user info
	public userBrief: UserBrief;

	// editors
	private headlineEditor: Editor;

	// dimmers
	private isRetrievingUserBrief: boolean;

	// messages
	private headlineError: Message;

	@ViewChild(ArticlesComponent)
	private articlesComponent: ArticlesComponent;


	constructor(
		private userService: UserService,
	) {
		this.userBrief = new UserBrief();

		this.headlineEditor = new Editor("");

		this.isRetrievingUserBrief = true;

		this.headlineError = new Message();
	}

	ngOnInit() {
		// get current user brief
		this.userService.getCurrentUserBrief()
			.then(userBrief => {
				this.isRetrievingUserBrief = false;

				this.headlineEditor.value = userBrief.headline;

				userBrief.avatar = HelperService.generateEditAvatarUrl(userBrief.avatar, 'B');

				this.userBrief = userBrief;
			})
			.catch(err => {
				this.isRetrievingUserBrief = false;

				this.displayError(err);
			});
	}

	// update user headline
	private updateHeadline(): void {
		this.headlineEditor.isHandling = true;

		this.userService.updateCurrentUserHeadline(this.headlineEditor.value)
			.then(() => {
				this.userBrief.headline = this.headlineEditor.value;

				this.headlineEditor.isEditing = false;
				this.headlineEditor.isHandling = false;
				this.headlineError.isShowing = false;
			})
			.catch(err => {
				this.headlineEditor.isHandling = false;

				this.displayError(err);
			});
	}

	// an unfollow happens, tell articles to remove his/her articles
	private onUnfollow(userId: string): void {
		this.userBrief.followingCount--;

		this.articlesComponent.removeByUserId(userId);
	}

	// a follow happens, tell articles to add his/her articles
	private onFollow(userId: string): void {
		this.userBrief.followingCount++;

		this.articlesComponent.addByUserId(userId);
	}

	private displayError(err): void {
		this.headlineError.isShowing = true;
		this.headlineError.message = err;
	}

}
