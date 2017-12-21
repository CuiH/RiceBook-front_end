import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LogInInfo } from './log-in-info';
import { RegistrationInfo } from './registration-info';
import { UserService } from '../user.service';
import { LocalService } from '../local.service';
import { Message } from '../message';
import { Editor } from '../editor';
import { HelperService } from '../helper.service';


@Component({
	selector: 'app-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

	// whether to show the log-in form or the sign-up form
	private isLogin: boolean;

	// the sign-up information
	private newUser: RegistrationInfo;

	// the log-in information
	public logInInfo: LogInInfo;

	// the password confirmation input
	private passwordConfirmation: string;

	// editors
	private logInEditor: Editor;
	private signUpEditor: Editor;

	// messages
	private logInError: Message;
	private signUpError: Message;

	private authUrl: string;


	constructor(
		private localService: LocalService,
		private userService: UserService,
		private router: Router,
		private route: ActivatedRoute
	) {
		// if logged-in, redirect to main page
		if (this.localService.isLoggedIn()) {
			this.router.navigate(['/main']);
		}

		this.isLogin = false;

		this.passwordConfirmation = "";

		this.newUser = new RegistrationInfo();
		this.logInInfo = new LogInInfo();

		this.logInEditor = new Editor("");
		this.signUpEditor = new Editor("");

		this.logInError = new Message();
		this.signUpError = new Message();

		this.authUrl = HelperService.remoteUrl + 'auth/twitter';
	}

	ngOnInit() {
		// check query param: show log-in form or sign-up form
		this.route.queryParams
			.subscribe(params => {
				// login from third party callback
				if (params.cb) {
					this.localService.setLoggedInUsername(params.cb);

					this.router.navigate(['/main']);
				}

				this.isLogin = !((params.type || "") === "sign_up");
			});
	}

	// handle sign-up logic
	private signUp(): void {
		this.signUpEditor.isHandling = true;

		// if succeed, navigate to the main page
		this.userService.signUp(this.newUser)
			.then(() => this.router.navigate(['/main']))
			.catch((err) => {
				this.signUpEditor.isHandling = false;
				this.signUpError.isShowing = true;
				this.signUpError.message = err;
			});

	}

	// handle sign-up logic
	public logIn(): void {
		this.logInEditor.isHandling = true;

		// if succeed, navigate to the main page
		this.userService.logIn(this.logInInfo)
			.then(() => this.router.navigate(['/main']))
			.catch((err) => {
				this.logInEditor.isHandling = false;
				this.logInError.isShowing = true;
				this.logInError.message = err;
			});
	}

	private testTwitter(): void {

	}

}
