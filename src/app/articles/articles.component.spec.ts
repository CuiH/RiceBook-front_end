import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { expect } from 'chai';

import { Actions } from '../../../unit/actions';
import { fakeArticles } from '../../../unit/fake-data';
import { ArticlesComponent } from './articles.component';
import { ArticleService } from './article.service';
import { FakeArticleDetailComponent } from '../../../unit/fake-article-detail.component';
import { FakeUploaderDirective } from '../../../unit/fake-uploader.directive';
import { ArticleUploaderComponent } from '../article-uploader/article-uploader.component';


describe('Articles Component', () => {

	let comp: ArticlesComponent;
	let fixture: ComponentFixture<ArticlesComponent>;


	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule
			],
			declarations: [
				ArticlesComponent,
				FakeArticleDetailComponent,
				FakeUploaderDirective,
				ArticleUploaderComponent
			],
			providers: [
				{ provide: ArticleService, useClass: Actions },
			]
		}).compileComponents();
	}));

	beforeEach(async(() => {
		fixture = TestBed.createComponent(ArticlesComponent);
		comp = fixture.componentInstance;

		// spy on
		const articleService = fixture.debugElement.injector.get(ArticleService);
		spyOn(articleService, 'getAllCurrentUserFeeds')
			.and.returnValue(new Promise((res, rej) => res(fakeArticles)));

		// call ngOnInit()
		fixture.detectChanges();

		fixture.whenStable()
			.then(() => {
				// update view
				fixture.detectChanges();
			});
	}));

	it(`should fetch articles`, () => {
		// update inputs
		expect(comp.articles.length).to.be.greaterThan(0);
	});

	it(`should render articles`, () => {
		const articleRows = fixture.debugElement.queryAll(By.css('.fake-article-detail'));
		expect(articleRows.length).to.eql(fakeArticles.length);
	});

	it(`should update the search keyword`, () => {
		const keyword = "test";

		const articlesSearchInput = fixture.debugElement.query(By.css('#article_search')).nativeElement;

		// update inputs
		articlesSearchInput.value = keyword;
		articlesSearchInput.dispatchEvent(new Event('input'));

		fixture.detectChanges();

		expect(comp.articlesFilterEditor.value).to.eql(keyword);
	});

	it(`should filter displayed articles by the search keyword`, () => {
		const oldLen = fixture.debugElement.queryAll(By.css('.fake-article-detail')).length;

		const articlesSearchInput = fixture.debugElement.query(By.css('#article_search')).nativeElement;

		// update input
		articlesSearchInput.value = "Hao";
		articlesSearchInput.dispatchEvent(new Event('input'));

		fixture.detectChanges();


		const newLen = fixture.debugElement.queryAll(By.css('.fake-article-detail')).length;
		expect(oldLen).to.not.eql(newLen);
	});

	it(`should dispatch actions to create a new article`, fakeAsync(() => {
		const newArticle = "This is a new article.";

		const oldLen = fixture.debugElement.queryAll(By.css('.fake-article-detail')).length;

		// update input
		const newArticleInput = fixture.debugElement.query(By.css('#pa_content')).nativeElement;
		newArticleInput.value = newArticle;
		newArticleInput.dispatchEvent(new Event('input'));

		fixture.detectChanges();

		// spy on
		const articleService = fixture.debugElement.injector.get(ArticleService);
		spyOn(articleService, 'postArticle')
			.and.returnValue(new Promise((res, rej) => res({ author: "new" })));

		// click
		const paBtn = fixture.debugElement.query(By.css('#pa_btn'));
		paBtn.triggerEventHandler('click', null);

		tick();

		fixture.detectChanges();

		const newLen = fixture.debugElement.queryAll(By.css('.fake-article-detail')).length;
		expect(oldLen + 1).to.eql(newLen);
	}));

});
