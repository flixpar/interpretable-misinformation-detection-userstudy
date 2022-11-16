import { Tweet, ExplainedTweet, SurveyTweet } from "./ui.js";
import { getAllTweets } from "./data.js";

const { createApp } = Vue;


const app = createApp({
	data() {
		return {
			"tweets": [],
			"explanationType": "expl",
		}
	},
	created() {
		getAllTweets().then((tweets) => {
			this.tweets = tweets;
		});
	}
});

app.config.isCustomElement = tag => tag.startsWith("ion-");

app.component("Tweet", Tweet);
app.component("ExplainedTweet", ExplainedTweet);
app.component("SurveyTweet", SurveyTweet);
app.mount("#content");
