import { mainPage } from './main.page';


describe('Main Page', () => {

	it('should create new article', () => {
		mainPage.navigate();
		const oldCount = mainPage.getArticleCount();
		mainPage.postArticle("This is a new article.");

		expect(mainPage.getArticleCount()).not.toEqual(oldCount);
	});

	it('should update article', () => {
		const newText = "New text.";

		mainPage.navigate();
		mainPage.editFirstArticle(newText);

		expect(mainPage.getFirstArticleText()).toEqual(newText);
	});

	it('should update headline', () => {
		const newText = "New headline.";

		mainPage.navigate();
		mainPage.editHeadline(newText);

		expect(mainPage.getHeadline()).toEqual(newText);
	});

	it('should follow a user', () => {
		const username = "unit";

		mainPage.navigate();
		const oldCount = mainPage.getFollowingCount();
		mainPage.follow(username);

		expect(mainPage.getFollowingCount()).not.toEqual(oldCount);
	});

	it('should unfollow a user', () => {
		mainPage.navigate();
		const oldCount = mainPage.getFollowingCount();
		mainPage.unfollowFirstFollowing();

		expect(mainPage.getFollowingCount()).not.toEqual(oldCount);
	});

	it('should filter articles', () => {
		mainPage.navigate();
		mainPage.filterArticles("The unique article.");

		expect(mainPage.getArticleCount()).toEqual(1);
		expect(mainPage.getFirstArticleAuthor()).toEqual("e2e");
	});

});
