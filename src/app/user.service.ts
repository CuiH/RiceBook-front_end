import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, RequestMethod } from '@angular/http';

import { UserProfile } from './profile/user-profile';
import { LocalService } from './local.service';
import { LogInInfo } from './landing/log-in-info';
import { RegistrationInfo } from './landing/registration-info';
import { UserBrief } from './main/user-brief';
import { HelperService } from './helper.service';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserService {

	constructor(
		private http: Http,
		private localService: LocalService,
		private helperService: HelperService
	) { }

	public logIn(logInInfo: LogInInfo): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Post,
			headers: new Headers({
				'Content-Type': "application/json"
			}),
			body: JSON.stringify(logInInfo),
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'login', options)
			.toPromise()
			.then(res => this.localService.setLoggedInUsername(res.json().username))
			.catch(this.helperService.generateErrorHandler());
	}

	public signUp(newUser: RegistrationInfo): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Post,
			headers: new Headers({
				'Content-Type': "application/json"
			}),
			body: JSON.stringify(newUser),
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'register', options)
			.toPromise()
			.then(() => this.logIn({
				username: newUser.username,
				password: newUser.password
			}))
			.catch(this.helperService.generateErrorHandler());
	}

	public logOut(): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Put,
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'logout', options)
			.toPromise()
			.catch(this.helperService.generateErrorHandler());
	}

	public getCurrentUserBrief(): Promise<any> {
		return this.http.get(HelperService.remoteUrl + 'brief', { withCredentials: true })
			.toPromise()
			.then(res => res.json() as UserBrief)
			.catch(this.helperService.generateErrorHandler());
	}

	public getCurrentUserProfile(): Promise<any> {
		return this.http.get(HelperService.remoteUrl + 'detail', { withCredentials: true })
			.toPromise()
			.then(res => res.json() as UserProfile)
			.catch(this.helperService.generateErrorHandler());
	}

	public updateCurrentUserHeadline(newHeadline: string): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Put,
			headers: new Headers({
				'Content-Type': "application/json"
			}),
			body: { "headline": newHeadline },
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'headline', options)
			.toPromise()
			.catch(this.helperService.generateErrorHandler());
	}

	public updateCurrentUserInfo(field: string, newValue: string): Promise<any> {
		let body = {};
		body[field] = newValue;

		let options = new RequestOptions({
			method: RequestMethod.Put,
			headers: new Headers({
				'Content-Type': "application/json"
			}),
			body: body,
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + field, options)
			.toPromise()
			.catch(this.helperService.generateErrorHandler());
	}

	public getAvatarById(id: string): Promise<any> {
		return this.http.get(HelperService.remoteUrl + 'avatars/' + id, { withCredentials: true })
			.toPromise()
			.then(res => res.json().avatars)
			.then(res => res[0].avatar)
			.catch(this.helperService.generateErrorHandler());
	}

	public updateCurrentUserAvatar(newAvatar: string): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Put,
			headers: new Headers({
				'Content-Type': "application/json"
			}),
			body: {"avatar": newAvatar},
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'avatar', options)
			.toPromise()
			.catch(this.helperService.generateErrorHandler());
	}

	public linkTwitterToLocal(logInInfo: LogInInfo): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Put,
			headers: new Headers({
				'Content-Type': "application/json"
			}),
			body: JSON.stringify(logInInfo),
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'auth/twitter/link', options)
			.toPromise()
			.then(() => this.localService.setLoggedInUsername(logInInfo.username))
			.catch(this.helperService.generateErrorHandler());
	}

	public unlinkTwitter(): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Delete,
			headers: new Headers({
				'Content-Type': "application/json"
			}),
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'auth/twitter/unlink', options)
			.toPromise()
			.catch(this.helperService.generateErrorHandler());
	}

}
