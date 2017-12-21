import { Component, OnInit, Input } from '@angular/core';

import { Editor } from '../editor';
import { Comment } from './comment';
import { ArticleService } from '../articles/article.service';
import { LocalService } from '../local.service';
import { Message } from '../message';
import { UserService } from '../user.service';
import { HelperService } from '../helper.service';


@Component({
	selector: 'app-comment-detail',
	templateUrl: './comment-detail.component.html',
	styleUrls: ['./comment-detail.component.css']
})
export class CommentDetailComponent implements OnInit {

	// current logged-in username
	private username: string;

	// editors
	private textEditor: Editor;

	// messages
	private commentError: Message;

	@Input()
	private articleId: string;

	@Input()
	private comment: Comment;


	constructor(
		private articleService: ArticleService,
		private localService: LocalService,
		private userService: UserService
	) {
		this.articleId = "";
		this.comment = new Comment();

		this.commentError = new Message();
	}

	ngOnInit() {
		this.username = this.localService.getLoggedInUsername();

		this.textEditor = new Editor(this.comment.text);

		// retrieve avatar
		this.userService.getAvatarById(this.comment.authorId)
			.then(avatar => this.comment.authorAvatar = HelperService.generateEditAvatarUrl(avatar, 'C'))
			.catch(err => err);
	}

	// edit a comment
	private edit(): void {
		this.textEditor.isHandling = true;

		this.articleService.editComment(this.articleId, this.comment._id, this.textEditor.value)
			.then(() => {
				this.comment.text = this.textEditor.value;

				this.textEditor.isHandling = false;
				this.textEditor.isEditing = false;
				this.commentError.isShowing = false;
			})
			.catch(err => {
				this.textEditor.isHandling = false;

				this.displayError(err);
			});
	}

	private displayError(err): void {
		this.commentError.isShowing = true;
		this.commentError.message = err;
	}

}
