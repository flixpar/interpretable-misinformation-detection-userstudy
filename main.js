import { getTweets } from "./data.js";
import { Tweet, ExplanationDisplay } from "./ui.js";


const { createApp } = Vue;

const app = createApp({
	data() {
		return {
			"tweets": getTweets(),
		}
	}
});

app.config.isCustomElement = tag => tag.startsWith("ion-");

app.component("Tweet", Tweet);
app.component("Explanaion", ExplanationDisplay);
app.mount("#feed");
