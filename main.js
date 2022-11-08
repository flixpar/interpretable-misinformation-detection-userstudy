const { createApp } = Vue;

let tweets = [
	{
		user: {
			name: "President Biden",
			username: "POTUS",
			img: "https://pbs.twimg.com/profile_images/1380530524779859970/TfwVAbyX_400x400.jpg",
		},
		content: "I'll do what it takes to bring inflation down.<br>But I won't accept the Republican argument that too many Americans have found good jobs and have more dignity in the workplace.  Or that our largest, most profitable corporations shouldn't have to pay their fair share.",
		meta: {retweets: "3,563", likes: "12.4K", comments: "5,614"},
	},
	{
		user: {
			name: "President Biden",
			username: "POTUS",
			img: "https://pbs.twimg.com/profile_images/1380530524779859970/TfwVAbyX_400x400.jpg",
		},
		content: "Ted Cruz said that folks who are receiving student debt relief are a bunch of \"slackers.\"<br>Who in God's name do these guys think they are?",
		meta: {retweets: "16.3K", likes: "93.2K", comments: "22.4K"},
	}
];


const app = createApp({
	data() {
		return {
			"tweets": tweets,
		}
	}
});

const Tweet = {
	props: ["user", "content", "meta"],
	data() {
		return {
			userImg: (this.user.img) ? this.user.img : `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`,
		}
	},
	template: `
	<div class="tweet border-b p-4 flex flex-row space-x-4">
		<div class="tweet-left flex-none">
			<div class="tweet-user-img">
				<img v-bind:src="userImg" alt="avatar" class="rounded-full w-14">
			</div>
		</div>
		<div class="tweet-right flex flex-col space-y-2 w-full">
			<div class="tweet-header">
				<div class="tweet-user flex flex-row items-center">
					<h4 class="font-semibold">{{ user.name }}</h4>
				</div>
			</div>
			<div class="tweet-content">
				<p v-html="content" class=""></p>
			</div>
			<div class="tweet-footer w-full">
				<div class="tweet-actions grid grid-cols-4 text-slate-500">
					<span>
						<ion-icon name="chatbox-outline" class="text-l leading-normal align-middle"></ion-icon>
						<span class="text-sm leading-normal align-middle ml-1">{{ meta.comments }}</span>
					</span>
					<span>
						<ion-icon name="repeat-outline" class="text-l leading-normal align-middle"></ion-icon>
						<span class="text-sm leading-normal align-middle ml-1">{{ meta.retweets }}</span>
					</span>
					<span>
						<ion-icon name="heart-outline" class="text-l leading-normal align-middle"></ion-icon>
						<span class="text-sm leading-normal align-middle ml-1">{{ meta.likes }}</span>
					</span>
					<ion-icon name="share-outline"></ion-icon>
				</div>
			</div>
		</div>
	</div>
	`
};

app.config.isCustomElement = tag => tag.startsWith("ion-");

app.component("Tweet", Tweet);
app.mount("#feed");
