import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { MainComponent } from './main/main.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { LoggedInRouteGuard } from './logged-in-route.guard';


const routes: Routes = [
	{path: '', redirectTo: '/landing', pathMatch: 'full'},
	{path: 'main', component: MainComponent, canActivate: [LoggedInRouteGuard]},
	{path: 'landing', component: LandingComponent},
	{path: 'profile', component: ProfileComponent, canActivate: [LoggedInRouteGuard]},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { useHash: true })
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
