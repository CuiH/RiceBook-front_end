import { Component, OnInit } from '@angular/core';

import { ArticleService } from './article.service';
import { Article } from '../article-detail/article';
import { Editor } from '../editor';
import { Message } from '../message';


@Component({
	selector: 'app-articles',
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

	// articles
	public articles: Article[];
	private activeArticles: Article[];

	// editors
	public articlesFilterEditor: Editor;

	// messages
	private articlesError: Message;

	// dimmers
	private isRetrievingArticles: boolean;


	constructor(
		private articleService: ArticleService
	) {
		this.articles = [];
		this.activeArticles = [];

		this.articlesFilterEditor = new Editor("");

		this.articlesError = new Message();

		this.isRetrievingArticles = true;
	}

	ngOnInit() {
		// get all articles (self and followings)
		this.articleService.getAllCurrentUserFeeds()
			.then(res => this.setArticles(res, false))
			.catch(err => {
				this.isRetrievingArticles = false;

				this.displayError(err);
			});
	}

	// handle articles
	private setArticles(articles: Article[], needSort: boolean) {
		this.isRetrievingArticles = false;

		if (needSort) articles.sort((a1, a2) => a1.createTime > a2.createTime ? -1 : 1);

		this.articles = articles.concat();

		// initially, all articles will be displayed
		this.activeArticles = articles.concat();
	}

	// filter displaying articles according to user input
	private filter(): void {
		this.activeArticles = this.articles.filter(article =>
			article.author.indexOf(this.articlesFilterEditor.value) != -1
				|| article.text.indexOf(this.articlesFilterEditor.value) != -1);
	}

	// remove articles by userId (called by parent)
	public removeByUserId(userId: string): void {
		const articles = this.articles.filter(article => article.authorId !== userId);

		this.setArticles(articles, false);
	}

	// add articles by userId (called by parent)
	public addByUserId(userId: string): void {
		this.isRetrievingArticles = true;

		this.articleService.getAllArticlesByUserId(userId)
			.then(res => {
				// concat articles
				const articles = this.articles.concat(res);

				this.setArticles(articles, true);

				this.articlesError.isShowing = false;
			})
			.catch(err => {
				this.isRetrievingArticles = false;

				this.displayError(err);
			});
	}

	// a new article was posted
	private onPost(article: Article): void {
		// add to the head of the articles list
		this.articles.splice(0, 0, article);
		this.activeArticles.splice(0, 0, article);
	}

	private displayError(err): void {
		this.articlesError.isShowing = true;
		this.articlesError.message = err;
	}

}
