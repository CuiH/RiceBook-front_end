import { Component, OnInit } from '@angular/core';

import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';

import { UserService } from '../user.service';
import { UserProfile } from './user-profile';
import { Message } from '../message';
import { Editor } from '../editor';
import { PasswordInfo } from './password-info';
import { ProfileInfo } from './profile-info';
import { HelperService } from '../helper.service';
import { LogInInfo } from '../landing/log-in-info';


@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	// the displaying info of the current user
	public userProfile: UserProfile;

	// messages
	private profileError: Message;
	private profileSuccess: Message;
	private thirdPartyError: Message;
	private passwordError: Message;

	// new profile editors
	private profileInfo: ProfileInfo;
	private logInInfo: LogInInfo;
	private passwordInfo: PasswordInfo;

	// editors
	private profileEditor: Editor;
	private thirdPartyEditor: Editor;
	private passwordEditor: Editor;
	private avatarEditor: Editor;

	// image uploader
	private uploader: FileUploader;

	// progress bar value
	private uploadProgress: number;

	// dimmers
	private isRetrievingUserProfile: boolean;

	private authUrl: string;


	constructor(
		private userService: UserService
	) {
		this.userProfile = new UserProfile();

		this.passwordError = new Message();
		this.profileError = new Message();
		this.thirdPartyError = new Message();
		this.profileSuccess = new Message();

		this.passwordInfo = new PasswordInfo();
		this.profileInfo = new ProfileInfo();
		this.logInInfo = new LogInInfo();

		this.profileEditor = new Editor("");
		this.passwordEditor = new Editor("");
		this.thirdPartyEditor = new Editor("");
		this.avatarEditor = new Editor("");

		this.uploadProgress = 0;

		this.authUrl = HelperService.remoteUrl + 'auth/twitter';

		// init uploader
		const uploaderOptions: FileUploaderOptions = {
			url: HelperService.remoteUrl + 'avatar',
			method: "PUT",
			removeAfterUpload: true
		};

		this.uploader = new FileUploader(uploaderOptions);
	}

	ngOnInit() {
		this.passwordError.isShowing = true;
		this.passwordError.message = "Cannot update password.";

		this.retrieveProfile();

		this.initAvatarForm();
	}

	// retrieve user profile
	private retrieveProfile(): void {
		this.isRetrievingUserProfile = true;

		this.userService.getCurrentUserProfile()
			.then(profile => {
				this.isRetrievingUserProfile = false;

				profile.avatar = HelperService.generateEditAvatarUrl(profile.avatar, 'P');

				this.userProfile = profile;

				this.profileInfo = JSON.parse(JSON.stringify(profile)) as ProfileInfo;
			})
			.catch(err => {
				this.isRetrievingUserProfile = false;

				this.displayError(err);
			});
	}

	// init avatar form and set listeners
	private initAvatarForm(): void {
		// overwrite build avatar form method
		this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
			form.append('file', fileItem);

			fileItem.withCredentials = true;

			return { fileItem, form };
		};

		// after uploading
		this.uploader.onCompleteItem = (file: any, res: string, status: number, headers: ParsedResponseHeaders) => {
			this.avatarEditor.isHandling = false;

			const resObj = JSON.parse(res);

			// handle error
			if (!resObj.avatar) return this.displayError(resObj.message);

			this.userProfile.avatar = HelperService.generateEditAvatarUrl(resObj.avatar, 'P');
		};

		// update upload progress
		this.uploader.onProgressItem = (file: any, progress: any) => this.uploadProgress = progress;
	}

	// show new avatar info
	private showAvatarInfo(): void {
		this.avatarEditor.value = this.uploader.queue[0].file.name;
		this.avatarEditor.isEditing = true;
	}

	// upload the new avatar
	private updateAvatar(): void {
		this.avatarEditor.isEditing = false;
		this.avatarEditor.isHandling = true;

		this.uploadProgress = 0;

		this.uploader.queue[0].upload();
	}

	// clear the selected image
	private clearAvatar(): void {
		this.avatarEditor.isEditing = false;

		this.uploader.clearQueue();
	}

	// update changed fields of user profile
	private updateProfile(): void {
		this.profileEditor.isHandling = true;

		let promises = [];

		// check can-update fields
		["email", "phone", "zipcode"].forEach(key => {
			if (this.profileInfo[key] !== this.userProfile[key])
				promises.push(
					this.userService.updateCurrentUserInfo(key, this.profileInfo[key])
						.then(() => this.userProfile[key] = this.profileInfo[key])
				);
		});

		Promise.all(promises)
			.then(() => {
				this.profileError.isShowing = false;

				this.profileEditor.isHandling = false;
				this.profileEditor.isEditing = false;

				this.profileSuccess.isShowing = true;
				this.profileSuccess.message = "Your profile has been updated.";
			})
			.catch(err => {
				this.profileEditor.isHandling = false;

				this.displayError(err);
			});
	}

	private linkTwitterToLocal(): void {
		this.thirdPartyEditor.isHandling = true;

		this.userService.linkTwitterToLocal(this.logInInfo)
			.then(() => {
				this.thirdPartyError.isShowing = false;

				this.thirdPartyEditor.isHandling = false;
				this.thirdPartyEditor.isEditing = false;

				this.profileSuccess.message = "Your accounts are linked.";
				this.profileSuccess.isShowing = true;

				this.logInInfo = new LogInInfo();

				this.retrieveProfile();
			})
			.catch(err => {
				this.thirdPartyEditor.isHandling = false;

				this.thirdPartyError.message = err;
				this.thirdPartyError.isShowing = true;
			});
	}

	private unlinkTwitter(): void {
		this.thirdPartyEditor.isHandling = true;

		this.userService.unlinkTwitter()
			.then(() => {
				this.thirdPartyEditor.isHandling = false;

				this.userProfile.auth = [];

				this.profileSuccess.message = "Successfully unlinked.";
				this.profileSuccess.isShowing = true;
			})
			.catch(err => {
				this.thirdPartyEditor.isHandling = false;

				this.displayError(err);
			});
	}

	private displayError(err): void {
		this.profileError.isShowing = true;
		this.profileError.message = err;
	}

}
