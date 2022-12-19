import { getStaticTweets } from "./data.js";
import { ExplainedTweet } from "./ui.js";

const { createApp } = Vue;


const app = createApp({
	data() {
		return {
			"tweets": [],
		}
	},
	created() {
		getStaticTweets().then((tweets) => {
			this.tweets = tweets;
		});
	}
});

app.config.isCustomElement = tag => tag.startsWith("ion-");

app.component("ExplainedTweet", ExplainedTweet);
app.mount("#content");
