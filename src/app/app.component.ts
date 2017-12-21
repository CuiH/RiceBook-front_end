import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalService } from './local.service';
import { UserService } from './user.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	// whether there's a logged-in user
	private loggedIn: boolean;

	// the logged in user's account name
	private username: string;


	constructor(
		private localService: LocalService,
		private userService: UserService,
		private router: Router
	) {
		this.loggedIn = false;

		this.username = "";
	}

	ngOnInit() {
		// init (in case of cookie)
		if (this.localService.isLoggedIn()) {
			this.loggedIn = true;
			this.username = this.localService.getLoggedInUsername();
		}

		// subscribe log-in event
		this.localService.getLogInBroadcast().subscribe(name => {
			this.loggedIn = true;
			this.username = name;
		});

		// subscribe log-out event
		this.localService.getLogOutBroadcast().subscribe(() => this.loggedIn = false);
	}

	private logOut(): void {
		this.userService.logOut();
		this.localService.clearLoggedInUsername();

		this.router.navigate([ '/landing' ], { queryParams: { type: 'log_in' } });
	}

}
