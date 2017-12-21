import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SuiModule } from "ng2-semantic-ui";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CloudinaryModule } from '@cloudinary/angular-4.x';
import * as Cloudinary from 'cloudinary-core';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { LocalService } from './local.service';
import { UserService } from './user.service';
import { LoggedInRouteGuard } from './logged-in-route.guard';
import { AgeValidator } from './landing/age.validator';
import { PasswordValidator } from './landing/password.validator';
import { FollowingService } from './followings/following.service';
import { ArticleService } from './articles/article.service';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticlesComponent } from './articles/articles.component';
import { FollowingsComponent } from './followings/followings.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';
import { HelperService } from './helper.service';
import { ArticleUploaderComponent } from './article-uploader/article-uploader.component';


@NgModule({
	declarations: [
		AppComponent,
		MainComponent,
		LandingComponent,
		ProfileComponent,
		AgeValidator,
		PasswordValidator,
		ArticleDetailComponent,
		ArticlesComponent,
		FollowingsComponent,
		CommentDetailComponent,
		FileSelectDirective,
		ArticleUploaderComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		SuiModule,
		ReactiveFormsModule,
		FormsModule,
		HttpModule,
		CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'hcui95'}),
	],
	providers: [
		{ provide: LOCALE_ID, useValue: "en-US" },
		LocalService,
		UserService,
		HelperService,
		CookieService,
		ArticleService,
		FollowingService,
		LoggedInRouteGuard
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
