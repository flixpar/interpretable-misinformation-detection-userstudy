import { getTweetGroup, getTweetGroupOrder } from "./data.js";
import { SurveyTweet } from "./ui.js";

const { createApp } = Vue;


const app = createApp({
	data() {
		const explanationTypeVal = parseInt(window.location.pathname.split("/")[3]);
		const explanationType = ["none", "pred", "expl"][explanationTypeVal-1];

		const userGroup = parseInt(window.location.pathname.split("/")[2]);
		const tweetGroup = getTweetGroupOrder(userGroup)[explanationTypeVal-1];

		const roundInstructionsList = [
			"Round 1: Try identifying misinformation in tweets with no assistance.",
			"Round 2: The green, yellow, and red bars indicate whether our framework classifies a tweet as misinformation. You can use this information if you find it helpful.",
			"Round 3: You can hover over the colored bars to learn more about how our framework classifies each tweet. You can use this information if you find it helpful.",
		];
		const roundInstructions = roundInstructionsList[explanationTypeVal-1];

		return {
			"tweets": [],
			"explanationType": explanationType,
			"explanationTypeVal": explanationTypeVal,
			"userGroup": userGroup,
			"tweetGroup": tweetGroup,
			"roundInstructions": roundInstructions,
		}
	},
	created() {
		getTweetGroup(this.tweetGroup).then((tweets) => {
			this.tweets = tweets;
		});
	},
	methods: {
		next: function() {
			let surveyResults = [];
			for (const tweet of this.tweets) {
				let scoreInputName = "survey-score-" + tweet.tweetId;
				let scoreInput = document.querySelector(`input[name="${scoreInputName}"]:checked`);
				if (scoreInput == null) {
					continue;
				}
				let surveyScore = scoreInput.value;
				surveyResults.push({"tweetId": tweet.tweetId, "score": surveyScore});
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
				}),
			}).then(response => {
				if (response.ok) {
					if (this.explanationTypeVal < 3) {
						window.location.href = `/survey/${this.userGroup}/${this.explanationTypeVal+1}`;
					} else {
						window.location.href = "/survey/feedback";
					}
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
