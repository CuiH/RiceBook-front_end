import { Component, Input } from '@angular/core';

import { Article } from '../src/app/article-detail/article';


@Component({
	selector: 'app-article-detail',
	template: '<div class="fake-article-detail">{{ article.author }}</div>',
})
export class FakeArticleDetailComponent {

	@Input()
	private article: Article;


	constructor() {	}

}
