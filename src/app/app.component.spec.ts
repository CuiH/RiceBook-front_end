import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { expect } from 'chai';

import { FakeLocalService } from '../../unit/fake-local.service';
import { FakeRouter } from '../../unit/fake-router';
import { AppComponent } from './app.component';
import { LocalService } from './local.service';
import { FakeRouterOutletComponent } from '../../unit/fake-router-outlet.component';
import { FakeRouterLinkDirective } from '../../unit/fake-router-link.directive';
import { FakeQueryParamsDirective } from '../../unit/fake-query-params.directive';
import { Actions } from '../../unit/actions';
import { UserService } from './user.service';


describe('App Component', () => {

	const localService = new FakeLocalService();

	let comp: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	let links: FakeRouterLinkDirective[];
	let linkDes: DebugElement[];

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ ],
			declarations: [
				AppComponent,
				FakeRouterOutletComponent,
				FakeRouterLinkDirective,
				FakeQueryParamsDirective
			],
			providers: [
				{ provide: LocalService, useValue: localService },
				{ provide: UserService,  useClass: Actions},
				{ provide: Router,       useClass: FakeRouter }
			]
		}).compileComponents();
	}));

	beforeEach(async(() => {
		// init
		localService.setLoggedInUsername("test");

		fixture = TestBed.createComponent(AppComponent);
		comp = fixture.componentInstance;

		// call ngOnInit()
		fixture.detectChanges();

		fixture.whenStable()
			.then(() => {
				// update view
				fixture.detectChanges();

				// cache dom
				linkDes = fixture.debugElement
					.queryAll(By.directive(FakeRouterLinkDirective));

				links = linkDes
					.map(d => d.injector.get(FakeRouterLinkDirective) as FakeRouterLinkDirective);
			});
	}));

	it(`should navigate to main`, () => {
		const profileLinkDe = linkDes[0];
		const profileLink = links[0];

		// click
		profileLinkDe.triggerEventHandler('click', null);

		fixture.detectChanges();

		expect(profileLink.navigatedTo).to.eql('/main');
	});

	it(`should navigate to profile`, () => {
		const profileLinkDe = linkDes[1];
		const profileLink = links[1];

		// click
		profileLinkDe.triggerEventHandler('click', null);

		fixture.detectChanges();

		expect(profileLink.navigatedTo).to.eql('/profile');
	});

	it(`should log out a user`, () => {
		// spy on
		const userService = fixture.debugElement.injector.get(UserService);
		spyOn(userService, 'logOut')
			.and.returnValue(new Promise((res, rej) => res()));

		const router = fixture.debugElement.injector.get(Router);
		const spy = spyOn(router, 'navigate');

		// click
		const loBtn = fixture.debugElement.query(By.css('#lo_btn'));
		loBtn.triggerEventHandler('click', null);

		fixture.detectChanges();

		const navArgs = spy.calls.first().args[0];
		expect(navArgs[0]).to.eql('/landing');
	});

});
