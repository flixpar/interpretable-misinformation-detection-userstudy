import { getExampleTweets } from "./data.js";
import { Tweet, ExplainedTweet } from "./ui.js";

const { createApp } = Vue;


const app = createApp({
	data() {
		return {
			"tweets": [],
			"explanationType": "expl",
		}
	},
	created() {
		getExampleTweets().then((tweets) => {
			this.tweets = tweets;
		});
	}
});

app.config.isCustomElement = tag => tag.startsWith("ion-");

app.component("Tweet", Tweet);
app.component("ExplainedTweet", ExplainedTweet);
app.mount("#content");
