import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { expect } from 'chai';

import { Actions } from '../../../unit/actions';
import { FollowingsComponent } from './followings.component';
import { FollowingService } from './following.service';
import { fakeFollowings } from '../../../unit/fake-data';


describe('Followings Component', () => {

	let comp: FollowingsComponent;
	let fixture: ComponentFixture<FollowingsComponent>;


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule
			],
			declarations: [
				FollowingsComponent
			],
			providers: [
				{ provide: FollowingService, useClass: Actions },
			]
		}).compileComponents();
	}));

	beforeEach(async(() => {
		fixture = TestBed.createComponent(FollowingsComponent);
		comp = fixture.componentInstance;

		// spy on
		const followingService = fixture.debugElement.injector.get(FollowingService);
		spyOn(followingService, 'getCurrentUserFollowingBriefs')
			.and.returnValue(new Promise((res, rej) => res(fakeFollowings)));

		// call ngOnInit()
		fixture.detectChanges();

		fixture.whenStable()
			.then(() => {
				// update view
				fixture.detectChanges();
			});
	}));

	it(`should display error message to user`, fakeAsync(() => {
		// update input
		const followingSearchInput = fixture.debugElement.query(By.css('#following_search')).nativeElement;
		followingSearchInput.value = "test";
		followingSearchInput.dispatchEvent(new Event('input'));

		fixture.detectChanges();

		// spy on
		const followingService = fixture.debugElement.injector.get(FollowingService);
		spyOn(followingService, 'follow')
			.and.returnValue(new Promise((res, rej) => rej("Cannot follow.")));

		// click add followings
		const afBtn = fixture.debugElement.query(By.css('#af_btn'));
		afBtn.triggerEventHandler('click', null);

		tick();

		fixture.detectChanges();

		const afMsg = fixture.debugElement.query(By.css('#af_msg'));
		expect(afMsg).to.not.be.null;
	}));

});
