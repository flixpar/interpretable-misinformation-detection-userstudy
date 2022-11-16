import { getTweets } from "./data.js";
import { SurveyTweet } from "./ui.js";

const { createApp } = Vue;


const app = createApp({
	data() {
		return {
			"tweets": [],
			"explanationType": "expl",
			"timer": null,
		}
	},
	created() {
		getTweets().then((tweets) => {
			this.tweets = tweets;
		});
		this.timer = Date.now();
	},
	methods: {
		next: function() {
			this.submit();
		},
		submit: function() {
			let surveyResults = [];
			for (const tweet of this.tweets) {
				let scoreInputName = "survey-score-" + tweet.tweetId;
				let scoreInput = document.querySelector(`input[name="${scoreInputName}"]:checked`);
				if (scoreInput == null) {
					continue;
				}
				let surveyScore = scoreInput.value;
				surveyResults.push({"tweetId": tweet.tweetId, "score": surveyScore});
				console.log(tweet.tweetId, surveyScore);
			}
			if (surveyResults.length < this.tweets.length) {
				alert("Please complete the survey before continuing.");
				return;
			}
			fetch("/survey", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"surveyResults": surveyResults,
					"explanationType": this.explanationType,
					"elapsed": Date.now() - this.timer,
				}),
			}).then(response => {
				if (response.ok) {
					this.timer = Date.now();
				} else {
					alert("Error submitting survey results.");
				}
			});		
		},
	},
});

app.config.isCustomElement = tag => tag.startsWith("ion-");

app.component("SurveyTweet", SurveyTweet);
app.mount("#content");
