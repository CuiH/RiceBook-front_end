import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';
import { CookieService } from 'angular2-cookie/services/cookies.service';


@Injectable()
export class LocalService {

	// the logged-in username
	private loggedInUsername;

	// log-in broadcast
	private logInSource = new Subject<string>();
	private logIn$ = this.logInSource.asObservable();

	// log-out broadcast
	private logOutSource = new Subject<void>();
	private logOut$ = this.logOutSource.asObservable();


	constructor(
		private cookiesService: CookieService,
	) {
		this.initFromCookie();
	}

	private initFromCookie(): void {
		this.loggedInUsername = this.cookiesService.get("username");
	}

	public getLogInBroadcast(): any {
		return this.logIn$;
	}

	public getLogOutBroadcast(): any {
		return this.logOut$;
	}

	public isLoggedIn(): boolean {
		return !!this.loggedInUsername;
	}

	public getLoggedInUsername(): any {
		return this.loggedInUsername;
	}

	// called when new user logs in
	public setLoggedInUsername(username): void {
		this.loggedInUsername = username;

		// write to cookie
		this.cookiesService.put("username", this.loggedInUsername);

		// notify (make it async to avoid changedAfterXXError)
		setTimeout(() => this.logInSource.next(username), 0);
	}

	// called when current user logs out
	public clearLoggedInUsername(): void {
		this.loggedInUsername = null;

		// clear cookie
		this.cookiesService.removeAll();

		// notify
		this.logOutSource.next();
	}

}
