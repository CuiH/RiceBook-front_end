import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LocalService } from './local.service';


@Injectable()
export class LoggedInRouteGuard implements CanActivate {

	constructor(
		private localService: LocalService,
		private router: Router
	) { }

	// block not logged-in user from visiting, and redirect to log-in page
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
		if (this.localService.isLoggedIn()) {
			return true;
		} else {
			this.router.navigate(['/landing'], {queryParams: {type: 'log_in'}});

			return false;
		}
	}
}
