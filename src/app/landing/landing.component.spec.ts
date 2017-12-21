import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { expect } from 'chai';

import { Actions } from '../../../unit/actions';
import { LandingComponent } from './landing.component';
import { FakeLocalService } from '../../../unit/fake-local.service';
import { LocalService } from '../local.service';
import { UserService } from '../user.service';
import { FakeActivatedRoute } from '../../../unit/fake-activated-route';
import { FakeRouter } from '../../../unit/fake-router';


describe('Landing Component', () => {

	const localService = new FakeLocalService();
	const activatedRoute = new FakeActivatedRoute();

	let comp: LandingComponent;
	let fixture: ComponentFixture<LandingComponent>;

	let username: HTMLInputElement;
	let pwd: HTMLInputElement;
	let btn: DebugElement;


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule,
				ReactiveFormsModule
			],
			declarations: [ LandingComponent ],
			providers: [
				{ provide: LocalService,   useValue: localService },
				{ provide: UserService,    useClass: Actions },
				{ provide: Router,         useClass: FakeRouter },
				{ provide: ActivatedRoute, useValue: activatedRoute }
			]
		}).compileComponents();
	}));

	beforeEach(async(() => {
		// init
		activatedRoute.testParams = { type: 'log_in' };

		fixture = TestBed.createComponent(LandingComponent);
		comp = fixture.componentInstance;

		// call ngOnInit()
		fixture.detectChanges();

		fixture.whenStable()
			.then(() => {
				// update view
				fixture.detectChanges();

				// cache DOM
				username = fixture.debugElement.query(By.css('#li_username')).nativeElement;
				pwd = fixture.debugElement.query(By.css('#li_pwd')).nativeElement;
				btn = fixture.debugElement.query(By.css('#li_smt'));
			});
	}));

	it(`should log in a user`, fakeAsync(() => {
		// update inputs
		username.value = "hc42";
		username.dispatchEvent(new Event('input'));

		pwd.value = "a-strong-password";
		pwd.dispatchEvent(new Event('input'));

		fixture.detectChanges();

		// spy on
		const userService = fixture.debugElement.injector.get(UserService);
		spyOn(userService, 'logIn').and.returnValue(new Promise((res, rej) => res()));

		// spy on
		const router = fixture.debugElement.injector.get(Router);
		const spy = spyOn(router, 'navigate');

		// click
		btn.triggerEventHandler('click', null);

		tick();

		const navArgs = spy.calls.first().args[0];
		expect(navArgs[0]).to.eql('/main');
	}));

	it(`should not log in an invalid user`, fakeAsync(() => {
		// update inputs
		username.value = "xx1";
		username.dispatchEvent(new Event('input'));

		pwd.value = "wrong-password";
		pwd.dispatchEvent(new Event('input'));

		fixture.detectChanges();

		// spy on
		const userService = fixture.debugElement.injector.get(UserService);
		spyOn(userService, 'logIn').and.returnValue(new Promise((res, rej) => rej()));

		// click login
		btn.triggerEventHandler('click', null);

		tick();

		fixture.detectChanges();

		const msg = fixture.debugElement.query(By.css('#li_msg'));
		expect(msg).to.not.be.null;
	}));

});
