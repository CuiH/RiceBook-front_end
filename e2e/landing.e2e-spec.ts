import { landingPage } from './landing.page';


describe('Landing Page', () => {

	it('should register a new user', () => {
		landingPage.navigate();
		landingPage.register([ 'e2e', 'E2E test', 'a@test.com', '123-456-7890',
			'001995-05-05', '77030', 'a-strong-pwd', 'a-strong-pwd' ]);

		expect(landingPage.getUrl()).toEqual('http://localhost:49152/#/main');

		landingPage.logOut();
	});

	it('should login a user', () => {
		landingPage.navigate();
		landingPage.logIn("e2e", "a-strong-pwd");

		expect(landingPage.getUrl()).toEqual('http://localhost:49152/#/main');
	});

});
