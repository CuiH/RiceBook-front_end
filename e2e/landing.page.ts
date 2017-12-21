import { browser, by, element } from 'protractor';


export const landingPage = {

	navigate: () =>
		browser.get('/'),

	logIn: (username: string, password: string) => {
		element(by.css('#li_s_btn')).click();

		element(by.css('#li_username')).sendKeys(username);
		element(by.css('#li_pwd')).sendKeys(password);

		element(by.css('#li_smt')).click();
	},

	register: (values: string[]) => {
		element(by.css('#su_s_btn')).click();

		element(by.css('.ui.form')).all(by.tagName('input'))
			.map((e, i) => e.sendKeys(values[i]));

		element(by.css('#su_btn')).click();

		browser.waitForAngular();
	},

	logOut: () => {
		element(by.css('.ui.dropdown')).click();
		element(by.css('#lo_btn')).click();
	},

	getUrl: () => browser.getCurrentUrl()

};
