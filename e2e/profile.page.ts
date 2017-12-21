import { browser, by, element } from 'protractor';


export const profilePage = {

	navigate: () =>
		browser.get('/#/profile'),

	updateEmail: (newValue: string) => {
		element(by.css('#up_s_btn')).click();

		const input = element(by.css('.ui.form')).all(by.tagName('input')).get(2);
		input.clear();
		input.sendKeys(newValue);

		element(by.css('#up_btn')).click();

		// go back
		element(by.css('#up_cancel')).click();
	},

	getEmail: () =>
		element(by.css('.profile-values')).all(by.css('.row')).get(2).getText(),

	updateZipcode: (newValue: string) => {
		element(by.css('#up_s_btn')).click();

		const input = element(by.css('.ui.form')).all(by.tagName('input')).get(5);
		input.clear();
		input.sendKeys(newValue);

		element(by.css('#up_btn')).click();

		// go back
		element(by.css('#up_cancel')).click();
	},

	getZipcode: () =>
		element(by.css('.profile-values')).all(by.css('.row')).get(5).getText(),

	updatePassword: () =>
		element(by.css('.setting')).click(),

	getErrorMessage: () =>
		element(by.css('#pe_msg')).getText(),

};
