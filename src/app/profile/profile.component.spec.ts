import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { expect } from 'chai';

import { Actions } from '../../../unit/actions';
import { ProfileComponent } from './profile.component';
import { UserService } from '../user.service';
import { fakeUserProfile } from '../../../unit/fake-data';
import { FakeUploaderDirective } from '../../../unit/fake-uploader.directive';
import { FakeSuiProgressComponent } from '../../../unit/fake-sui-progress.component';


describe('Profile Component', () => {

	let comp: ProfileComponent;
	let fixture: ComponentFixture<ProfileComponent>;


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule,
				ReactiveFormsModule
			],
			declarations: [
				ProfileComponent,
				FakeUploaderDirective,
				FakeSuiProgressComponent
			],
			providers: [
				{ provide: UserService,    useClass: Actions }
			]
		}).compileComponents();
	}));

	beforeEach(async(() => {
		fixture = TestBed.createComponent(ProfileComponent);
		comp = fixture.componentInstance;

		// spy on
		const userService = fixture.debugElement.injector.get(UserService);
		spyOn(userService, 'getCurrentUserProfile')
			.and.returnValue(new Promise((res, rej) => res(fakeUserProfile)));

		// call ngOnInit()
		fixture.detectChanges();

		fixture.whenStable()
			.then(() => fixture.detectChanges());
	}));

	it(`should fetch the user's profile information`, () => {
		expect(comp.userProfile).to.eql(fakeUserProfile);
	});

	it(`should display success message to user`, fakeAsync(() => {
		// click show
		const upSBtn = fixture.debugElement.query(By.css('#up_s_btn'));
		upSBtn.triggerEventHandler('click', null);

		fixture.detectChanges();

		// click update
		const upBtn = fixture.debugElement.query(By.css('#up_btn'));
		upBtn.triggerEventHandler('click', null);

		tick();

		fixture.detectChanges();

		const upMsg = fixture.debugElement.query(By.css('#up_msg'));
		expect(upMsg).to.not.be.null;
	}));

});
