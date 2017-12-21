import { Comment } from '../comment-detail/comment';


export class Article {

	_id: string;
	createTime: string;
	author: string;
	authorId: string;
	authorAvatar: string;
	text: string;
	image: string;

	comments: Comment[];

}
