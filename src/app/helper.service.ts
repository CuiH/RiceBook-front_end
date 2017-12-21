import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalService } from './local.service';


@Injectable()
export class HelperService {

	public static remoteUrl = "https://hw7-back-end.herokuapp.com/";
	// public static remoteUrl = "http://localhost:3000/";


	constructor(
		private router: Router,
		private localService: LocalService
	) { }

	public static generateEditAvatarUrl(url: string, type: string): string {
		const parts = url.split('upload');

		switch(type) {
			case 'F':
				return parts[0] + "upload/" + "c_fill,h_180,w_162" + parts[1];
			case 'B':
				return parts[0] + "upload/" + "c_fill,h_325,w_275" + parts[1];
			case 'P':
				return parts[0] + "upload/" + "c_fill,h_170,w_170" + parts[1];
			case 'C':
				return parts[0] + "upload/" + "c_fill,h_100,w_100" + parts[1];
			case 'A':
				return parts[0] + "upload/" + "c_fill,h_100,w_100" + parts[1];
		}
	}

	public generateErrorHandler(): any {
		return err => {
			if (err.status == 401) {
				this.localService.clearLoggedInUsername();

				this.router.navigate(['/landing'], {queryParams: {type: 'log_in'}});
			} else {
				return Promise.reject(err.json().message);
			}
		}
	}

}
