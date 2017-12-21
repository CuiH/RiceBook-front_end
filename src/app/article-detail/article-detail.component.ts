import { Component, OnInit, Input } from '@angular/core';

import { Article } from './article';
import { ArticleService } from '../articles/article.service';
import { Editor } from '../editor';
import { Message } from '../message';
import { UserService } from '../user.service';
import { LocalService } from '../local.service';
import { HelperService } from '../helper.service';


@Component({
	selector: 'app-article-detail',
	templateUrl: './article-detail.component.html',
	styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

	// current logged-in username
	private username: string;

	@Input()
	private article: Article;

	private isShowingComments: boolean;

	private newCommentEditor: Editor;
	private textEditor: Editor;

	// messages
	private articleError: Message;


	constructor(
		private articleService: ArticleService,
		private localService: LocalService,
		private userService: UserService
	) {
		this.username = "";

		this.article = new Article();

		this.isShowingComments = false;

		this.newCommentEditor = new Editor("");

		this.articleError = new Message();
	}

	ngOnInit() {
		this.username = this.localService.getLoggedInUsername();

		this.textEditor = new Editor(this.article.text);

		// retrieve avatar
		this.userService.getAvatarById(this.article.authorId)
			.then(avatar => this.article.authorAvatar = HelperService.generateEditAvatarUrl(avatar, 'A'))
			.catch(err => err);
	}

	// edit an article
	private edit(): void {
		this.textEditor.isHandling = true;

		this.articleService.editArticle(this.article._id, this.textEditor.value)
			.then(() => {
				this.article.text = this.textEditor.value;

				this.textEditor.isEditing = false;
				this.textEditor.isHandling = false;
				this.articleError.isShowing = false;
			})
			.catch(err => {
				this.textEditor.isHandling = false;

				this.displayError(err);
			});
	}

	// post a new comment
	private postComment(): void {
		this.newCommentEditor.isHandling = true;

		// create new comment
		this.articleService.postComment(this.article._id, this.newCommentEditor.value)
			.then(comment => {
				// add the new comment to the head of the comments list
				this.article.comments.splice(0, 0, comment);

				// clear the input
				this.newCommentEditor.value = "";
				this.newCommentEditor.isHandling = false;
				this.articleError.isShowing = false;
			})
			.catch(err => {
				this.newCommentEditor.isHandling = false;

				this.displayError(err);
			});
	}

	private displayError(err): void {
		this.articleError.isShowing = true;
		this.articleError.message = err;
	}

}
