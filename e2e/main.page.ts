import { browser, by, element } from 'protractor';


export const mainPage = {

	navigate: () =>
		browser.get('/#/main'),

	postArticle: (text: string) => {
		element(by.tagName('textarea')).sendKeys(text);

		element(by.css('#pa_btn')).click();
	},

	getArticleCount: () =>
		element.all(by.tagName('app-article-detail')).count(),

	editFirstArticle: (text: string) => {
		element(by.css('.post-button')).click();

		const editor = element(by.css('.post-editor'));
		editor.clear();
		editor.sendKeys(text);

		element(by.css('.checkmark')).click();
	},

	getFirstArticleText: () =>
		element(by.css('.post-text')).getText(),

	editHeadline: (text: string) => {
		element(by.css('#uh_s_btn')).click();

		const editor = element(by.css('#uh_nh'));
		editor.clear();
		editor.sendKeys(text);

		element(by.css('#uh_btn')).click();
	},

	getHeadline: () =>
		element(by.css('#uh_text')).getText(),

	follow: (username: string) => {
		element(by.css('#following_search')).sendKeys(username);

		element(by.css('#af_btn')).click();
	},

	unfollowFirstFollowing: () =>
		element(by.css('.remove')).click(),

	getFollowingCount: () =>
		element.all(by.css('.following-card')).count(),

	filterArticles: (keyword: string) =>
		element(by.css('#article_search')).sendKeys(keyword),

	getFirstArticleAuthor: () =>
		element(by.css('.post-author')).getText(),

};
