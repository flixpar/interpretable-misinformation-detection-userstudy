import { getTweets } from "./data.js";
import { Tweet, ExplanationDisplay } from "./ui.js";


const { createApp } = Vue;

const app = createApp({
	data() {
		return {
			"tweets": [],
			"explanationType": "none",
		}
	},
	created() {
		getTweets().then(tweets => {
			this.tweets = tweets;
		});
	}
});

app.config.isCustomElement = tag => tag.startsWith("ion-");

app.component("Tweet", Tweet);
app.component("Explanaion", ExplanationDisplay);
app.mount("#content");
