import { Injectable } from '@angular/core';
import { Http, RequestMethod, Headers, RequestOptions } from '@angular/http';

import { Article } from '../article-detail/article';
import { HelperService } from '../helper.service';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ArticleService {

	constructor(
		private http: Http,
		private helperService: HelperService
	) { }

	public getAllArticlesByUserId(userId: string): Promise<any> {
		return this.http.get(HelperService.remoteUrl +  'articles/' + userId, { withCredentials: true })
			.toPromise()
			.then(res => res.json().articles as Article[])
			.then(articles => {
				articles.forEach(article => article.comments.reverse());

				return articles;
			});
	}

	public getAllCurrentUserFeeds(): Promise<any> {
		return this.http.get(HelperService.remoteUrl +  'articles', { withCredentials: true })
			.toPromise()
			.then(res => res.json().articles as Article[])
			.then(articles => {
				articles.forEach(article => article.comments.reverse());

				return articles;
			});
	}

	public postArticleWithoutImage(text: string): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Post,
			headers: new Headers({
				'Content-Type': "application/json"
			}),
			body: { "text": text },
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'article/my', options)
			.toPromise()
			.then(res => res.json().article as Article)
			.then(article => article)
			.catch(this.helperService.generateErrorHandler());
	}

	public editArticle(articleId: string, newArticleText: string): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Put,
			headers: new Headers({
				'Content-Type': "application/json"
			}),
			body: { "text": newArticleText },
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'articles/my/' + articleId, options)
			.toPromise()
			.catch(this.helperService.generateErrorHandler());
	}

	public postComment(articleId: string, newCommentText: string): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Put,
			headers: new Headers({
				'Content-Type': "application/json"
			}),
			body: { "commentId": "-1", "text": newCommentText },
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'articles/my/' + articleId, options)
			.toPromise()
			.then(res => res.json().article as Article)
			.then(article => {
				const comments = article.comments;

				return comments[comments.length - 1];
			})
			.catch(this.helperService.generateErrorHandler());
	}

	public editComment(articleId: string, commentId: string, newCommentText: string): Promise<any> {
		let options = new RequestOptions({
			method: RequestMethod.Put,
			headers: new Headers({
				'Content-Type': "application/json"
			}),
			body: { "commentId": commentId, "text": newCommentText },
			withCredentials: true
		});

		return this.http.request(HelperService.remoteUrl + 'articles/my/' + articleId, options)
			.toPromise()
			.catch(this.helperService.generateErrorHandler());
	}

}
