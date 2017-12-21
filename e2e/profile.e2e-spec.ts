import { profilePage } from './profile.page';


describe('Profile Page', () => {

	it('should update email', () => {
		const newEmail = "22@33.com";

		profilePage.navigate();
		profilePage.updateEmail(newEmail);

		expect(profilePage.getEmail()).toEqual(newEmail);
	});

	it('should update zipcode', () => {
		const newZipcode = "12580";

		profilePage.navigate();
		profilePage.updateZipcode(newZipcode);

		expect(profilePage.getZipcode()).toEqual(newZipcode);
	});

	it('should not be able to update password', () => {
		profilePage.navigate();
		profilePage.updatePassword();

		expect(profilePage.getErrorMessage()).toEqual("Cannot update password.");
	});

});
