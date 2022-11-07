const { createApp } = Vue;

let tweets = [
	{
		username: "President Biden",
		content: "I'll do what it takes to bring inflation down.\n\nBut I won't accept the Republican argument that too many Americans have found good jobs and have more dignity in the workplace.  Or that our largest, most profitable corporations shouldn’t have to pay their fair share.",
	},
	{
		username: "President Biden",
		content: "Ted Cruz said that folks who are receiving student debt relief are a bunch of \"slackers.\"\nWho in God’s name do these guys think they are?",
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
	<div class="tweet">
		<div class="tweet-header">
			<div class="tweet-user">
				<img src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" alt="avatar" class="rounded-full">
				<h4>{{ username }}</h4>
			</div>
		</div>
		<div class="tweet-content">
			<p>{{ content }}</p>
		</div>
	</div>
	`
};

app.component("Tweet", Tweet);
app.mount("#feed");
