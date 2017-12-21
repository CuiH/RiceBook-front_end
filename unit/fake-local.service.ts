import { Injectable } from '@angular/core';

import { Subject }    from 'rxjs/Subject';


@Injectable()
export class FakeLocalService {

	// the logged-in username
	private loggedInUsername;

	// log-in broadcast
	private logInSource = new Subject<string>();
	private logIn$ = this.logInSource.asObservable();

	// log-out broadcast
	private logOutSource = new Subject<void>();
	private logOut$ = this.logOutSource.asObservable();


	constructor() {
		this.initFromCookie();
	}

	private initFromCookie(): void { }

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

	public setLoggedInUsername(username: string): void {
		this.loggedInUsername = username;
	}

	// called when current user logs out
	public clearLoggedInUsername(): void { }

}
