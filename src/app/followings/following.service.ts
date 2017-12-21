import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestMethod } from '@angular/http';

import { UserBrief } from '../main/user-brief';
import { HelperService } from '../helper.service';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class FollowingService {

	constructor(
		private http: Http,
		private helperService: HelperService
	) { }

	public getCurrentUserFollowingBriefs(): Promise<any> {
		return this.http.get(HelperService.remoteUrl + 'following/my', { withCredentials: true })
			.toPromise()
			.then(res => res.json().following as UserBrief[])
			.catch(this.helperService.generateErrorHandler());
	}

	public follow(username: string): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Put,
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'following/my/' + username, options)
			.toPromise()
			.then(res => res.json().newFollowing as UserBrief)
			.catch(this.helperService.generateErrorHandler());
	}

	public unfollow(id: string): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Delete,
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'following/' + id, options)
			.toPromise()
			.catch(this.helperService.generateErrorHandler());
	}

}
