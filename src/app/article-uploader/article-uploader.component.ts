import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';

import { Editor } from '../editor';
import { Message } from '../message';
import { HelperService } from '../helper.service';
import { ArticleService } from '../articles/article.service';
import { Article } from '../article-detail/article';


@Component({
	selector: 'app-article-uploader',
	templateUrl: './article-uploader.component.html',
	styleUrls: ['./article-uploader.component.css']
})
export class ArticleUploaderComponent implements OnInit {

	// editors
	private newArticleEditor: Editor;
	private imageEditor: Editor;

	// messages
	private newArticleError: Message;

	// image uploader
	private uploader: FileUploader;

	// progress bar value
	private uploadProgress: number;

	@Output()
	private onPost = new EventEmitter<Article>();


	constructor(
		private articleService: ArticleService
	) {
		this.newArticleEditor = new Editor("");
		this.imageEditor = new Editor("");

		this.newArticleError = new Message();

		// init uploader
		const uploaderOptions: FileUploaderOptions = {
			url: HelperService.remoteUrl + 'article/my',
			method: "POST",
			removeAfterUpload: true,
		};

		this.uploader = new FileUploader(uploaderOptions);
	}

	ngOnInit() {
		this.initImageForm();
	}

	// init image form and set listeners
	private initImageForm(): void {
		// overwrite build form method
		this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
			form.append('file', fileItem);

			fileItem.withCredentials = true;

			return { fileItem, form };
		};

		// after uploading
		this.uploader.onCompleteItem = (file: any, res: string, status: number, headers: ParsedResponseHeaders) => {
			this.imageEditor.isEditing = false;

			const resObj = JSON.parse(res);

			// handle error
			if (!resObj.article) {
				this.newArticleEditor.isHandling = false;

				return this.displayError(resObj.message);
			}

			this.afterArticlePosted(resObj.article);
		};

		// update upload progress
		this.uploader.onProgressItem = (file: any, progress: any) => this.uploadProgress = progress;
	}

	// show selected image info
	private showImageInfo(): void {
		this.imageEditor.value = this.uploader.queue[0].file.name;
		this.imageEditor.isEditing = true;
	}

	// clear the selected image
	private clearImage(): void {
		this.imageEditor.isEditing = false;

		this.uploader.clearQueue();
	}

	// post an article with or without an image
	private checkPost(): void {
		this.newArticleEditor.isHandling = true;

		if (this.imageEditor.isEditing)	this.postWithImage();
		else this.postWithoutImage();
	}

	// post an article with an image
	private postWithImage(): void {
		this.uploadProgress = 0;

		// append form data
		this.uploader.setOptions({ additionalParameter: { text: this.newArticleEditor.value }});

		this.uploader.queue[0].upload();
	}

	// post an article
	private postWithoutImage(): void {
		this.uploadProgress = 50;

		this.articleService.postArticleWithoutImage(this.newArticleEditor.value)
			.then(article => this.afterArticlePosted(article))
			.catch(err => {
				this.newArticleEditor.isHandling = false;

				this.displayError(err);
			});
	}

	// update UI after posting an article
	private afterArticlePosted(article: Article) {
		// notify parent
		this.onPost.emit(article);

		// clear user inout
		this.newArticleEditor.value = "";
		this.newArticleEditor.isHandling = false;

		this.newArticleError.isShowing = false;
	}

	private displayError(err): void {
		this.newArticleError.isShowing = true;
		this.newArticleError.message = err;
	}

}
