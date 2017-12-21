import { LogInInfo } from '../src/app/landing/log-in-info';
import { Article } from '../src/app/article-detail/article';


export const url = 'http://cuih.xyz';

export class Actions {

	private resource(method, endpoint, payload): Promise<any> {
		const options: RequestInit = {
			method: method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: ''
		};

		if (payload) options.body = JSON.stringify(payload);

		return fetch(`${url}/${endpoint}`, options)
			.then(r => {
				if (r.status === 200) {
					return r.headers.get('Content-Type').indexOf('json') > 0 ? r.json() : r.text();
				} else {
					// useful for debugging, but remove in production
					console.error(`${method} ${endpoint} ${r.statusText}`);
					throw new Error(r.statusText);
				}
			});
	};

	public logIn(logInInfo: LogInInfo): Promise<any> {
		return this.resource('POST', 'login', {
			username: logInInfo.username,
			password: logInInfo.password
		})
			.then(r => "ok");
	};

	public logOut(): Promise<any> {
		return this.resource('PUT', 'logout', null)
			.then(r => "ok");
	};

	public postArticle(newArticle: Article): Promise<any> {
		return this.resource('POST', 'article', {
			text: newArticle
		})
			.then(r => "ok");
	}

	public getAllCurrentUserFeeds(): Promise<any> {
		return this.resource('GET', 'articles', null)
			.then(r => r.articles);
	}

	public getCurrentUserFollowingBriefs(): Promise<any> {
		return this.resource('GET', 'followings', null)
			.then(r => r.following);
	}

	public follow(username: string): Promise<any> {
		return this.resource('PUT', 'followings' + username, null)
			.then(r => r.following);
	}

	public getCurrentUserBrief(): Promise<any> {
		return this.resource('GET', 'brief', null)
			.then(r => r);
	}

	public updateCurrentUserHeadline(newHeadline: string): Promise<any> {
		return this.resource('PUT', 'headline', {
			headline: newHeadline,
		})
			.then(r => "ok");
	}

	public getCurrentUserProfile(): Promise<any> {
		return this.resource('GET', 'profile', null)
			.then(r => r);
	}

}
