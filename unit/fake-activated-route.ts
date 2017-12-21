import { Params } from '@angular/router';

import { BehaviorSubject } from 'rxjs';


// copy from Angular Testing Tutorials
export class FakeActivatedRoute {

	// ActivatedRoute.paramMap is Observable
	private subject = new BehaviorSubject(this.testParams);
	public queryParams = this.subject.asObservable();

	// Test parameters
	private _testParams: Params;
	get testParams() { return this._testParams; }
	set testParams(params: {}) {
		this._testParams = params;
		this.subject.next(this._testParams);
	}

}