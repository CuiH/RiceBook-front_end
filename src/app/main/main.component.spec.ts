import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { expect } from 'chai';

import { Actions } from '../../../unit/actions';
import { MainComponent } from './main.component';
import { UserService } from '../user.service';
import { fakeUserBrief } from '../../../unit/fake-data';
import { FakeFollowingsComponent } from '../../../unit/fake-followings.component';
import { FakeArticlesComponent } from '../../../unit/fake-articles.component';


describe('Main Component', () => {

	let comp: MainComponent;
	let fixture: ComponentFixture<MainComponent>;


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule
			],
			declarations: [
				MainComponent,
				FakeFollowingsComponent,
				FakeArticlesComponent
			],
			providers: [
				{ provide: UserService, useClass: Actions },
			]
		}).compileComponents();
	}));

	beforeEach(async(() => {
		fixture = TestBed.createComponent(MainComponent);
		comp = fixture.componentInstance;

		// spy on
		const userService = fixture.debugElement.injector.get(UserService);
		spyOn(userService, 'getCurrentUserBrief')
			.and.returnValue(new Promise((res, rej) => res(fakeUserBrief)));

		// call ngOnInit()
		fixture.detectChanges();

		fixture.whenStable()
			.then(() => {
				// update view
				fixture.detectChanges();
			});
	}));

	it(`should update headline`, fakeAsync(() => {
		const newHeadline = "This is a new headline.";

		// show edit form
		const uhSBtn = fixture.debugElement.query(By.css('#uh_s_btn'));
		uhSBtn.triggerEventHandler('click', null);

		fixture.detectChanges();

		// update input
		const newHeadlineInput = fixture.debugElement.query(By.css('#uh_nh')).nativeElement;
		newHeadlineInput.value = newHeadline;
		newHeadlineInput.dispatchEvent(new Event('input'));

		fixture.detectChanges();

		// spy on
		const userService = fixture.debugElement.injector.get(UserService);
		spyOn(userService, 'updateCurrentUserHeadline')
			.and.returnValue(new Promise((res, rej) => res()));

		// click
		const uhBtn = fixture.debugElement.query(By.css('#uh_btn'));
		uhBtn.triggerEventHandler('click', null);

		tick();

		fixture.detectChanges();

		expect(comp.userBrief.headline).to.eql(newHeadline);
	}));

});
