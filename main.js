const { createApp } = Vue;

let tweets = [
	{
		username: "President Biden",
		content: "I'll do what it takes to bring inflation down.<br>But I won't accept the Republican argument that too many Americans have found good jobs and have more dignity in the workplace.  Or that our largest, most profitable corporations shouldn't have to pay their fair share.",
	},
	{
		username: "President Biden",
		content: "Ted Cruz said that folks who are receiving student debt relief are a bunch of \"slackers.\"<br>Who in God's name do these guys think they are?",
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
	props: ["username", "content"],
	template: `
	<div class="tweet border-b p-4 flex flex-row space-x-4">
		<div class="tweet-left flex-none">
			<div class="tweet-user-img">
				<img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" alt="avatar" class="rounded-full w-14">
			</div>
		</div>
		<div class="tweet-right flex flex-col space-y-2 w-full">
			<div class="tweet-header">
				<div class="tweet-user flex flex-row items-center">
					<h4 class="font-semibold">{{ username }}</h4>
				</div>
			</div>
			<div class="tweet-content">
				<p v-html="content" class=""></p>
			</div>
			<div class="tweet-footer w-full">
				<div class="tweet-actions grid grid-cols-4 text-l text-slate-500">
					<ion-icon name="chatbox-outline"></ion-icon>
					<ion-icon name="repeat-outline"></ion-icon>
					<ion-icon name="heart-outline"></ion-icon>
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
