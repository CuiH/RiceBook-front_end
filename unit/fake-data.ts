import { Article } from '../src/app/article-detail/article';
import { UserBrief } from '../src/app/main/user-brief';
import { UserProfile } from '../src/app/profile/user-profile';


export const fakeUserBrief: UserBrief = {
	"_id": "1",
	"username": "fake",
	"headline": "Life is a struggle.",
	"avatar": "http://cuih.xyz/assets/images/temp/avatar0.jpg",
	"followingCount": 0
};

export const fakeUserProfile: UserProfile = {
	"_id": "1",
	"username": "fake",
	"displayName": "fake name",
	"email": "ch@ch.com",
	"phone": "111-222-3333",
	"dob": "1995-01-01",
	"zipcode": "11111",
	"headline": "Life is a struggle.",
	"avatar": "http://cuih.xyz/assets/images/temp/avatar0.jpg"
};

export const fakeArticles: Article[] = [
	{
		"_id": "1",
		"author": "Hao Cui",
		"authorAvatar": "http://cuih.xyz/assets/images/temp/avatar0.jpg",
		"authorId": "1",
		"createTime": "2017-01-28T18:34:12.343Z",
		"text": "Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Fusce pharetra convallis urna. Quisque ut nisi. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Suspendisse non nisl sit amet velit hendrerit rutrum. Ut leo. Ut a nisl id ante tempus hendrerit. Proin pretium, leo ac pellentesque mollis, felis nunc ultrices eros, sed gravida augue augue mollis justo. Suspendisse eu ligula. Nulla facilisi. Donec id justo. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Curabitur suscipit suscipit tellus.",
		"image": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1219598022,4200434328&fm=173&s=28F26B86C845294D90890D1903001092&w=554&h=370&img.JPEG",
		"comments": [
			{
				"_id": "1",
				"author": "Yang Pan",
				"authorId": "2",
				"authorAvatar": "http://cuih.xyz/assets/images/temp/avatar1.jpg",
				"createTime": "2016-07-28T05:34:12.343Z",
				"text": "Aenean viverra rhoncus pede?",
			}
		],
	},
	{
		"_id": "7",
		"author": "Yang Pan",
		"authorId": "2",
		"authorAvatar": "http://cuih.xyz/assets/images/temp/avatar1.jpg",
		"createTime": "2016-02-28T01:14:12.343Z",
		"text": "Praesent vestibulum dapibus nibh. Etiam iaculis nunc ac metus. Ut id nisl quis enim dignissim sagittis. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Proin magna. Duis vel nibh at velit scelerisque suscipit. Curabitur turpis. Vestibulum suscipit nulla quis orci. Fusce ac felis sit amet ligula pharetra condimentum. Maecenas egestas arcu quis ligula mattis placerat. Duis lobortis massa imperdiet quam. Suspendisse potenti.",
		"image": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1189831449,4170754231&fm=173&s=BF8A78234901C2C41FE9ECD70100C0E2&w=554&h=370&img.JPEG",
		"comments": [],
	},
	{
		"_id": "6",
		"author": "Mo Tang",
		"authorId": "3",
		"authorAvatar": "http://cuih.xyz/assets/images/temp/avatar3.jpg",
		"createTime": "2016-03-28T15:24:12.343Z",
		"text": "Commodo eros a enim. Vestibulum turpis sem, aliquet eget, lobortis pellentesque, rutrum eu, nisl. Sed libero. Aliquam erat volutpat. Etiam vitae tortor. Morbi vestibulum volutpat enim. Aliquam eu nunc. Nunc sed turpis. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Nulla porta dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.",
		"image": "",
		"comments": [],
	}
];

export const fakeFollowings: UserBrief[] = [
	{
		"_id": "2",
		"username": "Yang Pan",
		"headline": "Please don't select COMP-557.",
		"avatar": "http://cuih.xyz/assets/images/temp/avatar3.jpg",
		"followingCount": 0
	},
	{
		"_id": "3",
		"username": "Xing Liu",
		"headline": "It's a sunny day.",
		"avatar": "http://cuih.xyz/assets/images/temp/avatar3.jpg",
		"followingCount": 0
	},
	{
		"_id": "4",
		"username": "Mo Tang",
		"headline": "The weather is good today.",
		"avatar": "http://cuih.xyz/assets/images/temp/avatar3.jpg",
		"followingCount": 0
	}
];