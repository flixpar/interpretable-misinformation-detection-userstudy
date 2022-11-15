export { Tweet, ExplainedTweet, SurveyTweet };


function colorscale(score) {
	let f = chroma.scale(["green", "yellow", "red"]).domain([0, 1]);
	return f(score).hex();
}

function colorscaleSimple(score) {
	if (score >= 0.5) {
		return "red";
	} else {
		return "green";
	}
}

const ScoreBar = {
	props: ["scoreName", "score"],
	data() {
		let barWidth = 0, margin = 0;
		if (this.score >= 0.5) {
			barWidth = (this.score - 0.5) * 100;
			margin = 50;
		} else {
			barWidth = (0.5 - this.score) * 100;
			margin = 50 - barWidth;
		}
		return {
			"color": colorscale(this.score),
			"barWidth": barWidth + "%",
			"margin": margin + "%",
		}
	},
	template: `
	<div class="explanation-score-bar mt-1" v-if="score>=0">
		<div class="flex flex-row justify-between">
			<h4 class="font-semibold leading-4">{{ scoreName }}</h4>
			<p class="text-xs leading-4">{{ (score*100).toFixed(0) }}%</p>
		</div>
		<div class="score-bar-outer w-full border border-slate-300">
			<div class="score-bar-inner h-2" :style="{backgroundColor: this.color, width: this.barWidth, marginLeft: this.margin}"></div>
			<span class="score-bar-divider absolute left-1/2 -mt-3 w-0.5 h-4 bg-black"></span>
		</div>
	</div>
	`,
}

const ExplanationDisplay = {
	props: ["misinformationScore", "explanation", "explanationType"],
	data() {
		return {
			"showScore": (this.explanationType != "none"),
			"showExplanation": (this.explanationType == "expl"),
			"hover": false,
		}
	},
	methods: {
		colorscaleSimple: colorscaleSimple,
		colorscale: colorscale,
	},
	watch: {
		"explanationType": function (newVal, oldVal) {
			this.showScore = (newVal != "none");
			this.showExplanation = (newVal == "expl");
		}
	},
	components: {"ScoreBar": ScoreBar},
	template: `
	<div class="explanation-display h-full flex flex-row cursor-pointer" @mouseover="hover=true" @mouseleave="hover=false">
		<div class="misinforamtion-score-bar h-full" v-if="showScore">
			<div class="misinformation-score-bar-inner h-full w-1" :style="{backgroundColor: colorscaleSimple(misinformationScore)}"></div>
		</div>
		<div class="explanation absolute bg-slate-50 p-4 rounded text-sm w-72 ml-1" v-if="showExplanation" v-show="hover">
			<div class="explanation-header border-b border-slate-300">
				<h3 class="font-semibold">Explanation</h3>
			</div>
			<div class="explanation-content">
				<score-bar score-name="Overall Score" :score="misinformationScore"></score-bar>
				<score-bar score-name="Text Score" :score="explanation.textScore"></score-bar>
				<score-bar score-name="User Score" :score="explanation.userScore"></score-bar>
				<score-bar score-name="Link Score" :score="explanation.linkScore"></score-bar>
			</div>
		</div>
	</div>
	`
};

const UserSurveyComponent = {
	props: ["tweetId"],
	data() {
		return {
			"score": -1,
		}
	},
	template: `
	<div class="user-survey-component border-t pt-3">
		<div class="radio-button-group flex flex-row justify-evenly">
			<p class="text-sm text-gray-400">Not Misinformation</p>
			<div class="radio-button flex flex-col items-center">
				<input type="radio" :id="radio-tweetId-1" value="1" v-model="score">
				<label class="radio-label text-xs text-gray-400" :for="radio-tweetId-1">1</label>
			</div>
			<div class="radio-button flex flex-col items-center">
				<input type="radio" :id="radio-tweetId-2" value="2" v-model="score">
				<label class="radio-label text-xs text-gray-400" :for="radio-tweetId-2">2</label>
			</div>
			<div class="radio-button flex flex-col items-center">
				<input type="radio" :id="radio-tweetId-3" value="3" v-model="score">
				<label class="radio-label text-xs text-gray-400" :for="radio-tweetId-3">3</label>
			</div>
			<div class="radio-button flex flex-col items-center">
				<input type="radio" :id="radio-tweetId-4" value="4" v-model="score">
				<label class="radio-label text-xs text-gray-400" :for="radio-tweetId-4">4</label>
			</div>
			<div class="radio-button flex flex-col items-center">
				<input type="radio" :id="radio-tweetId-5" value="5" v-model="score">
				<label class="radio-label text-xs text-gray-400" :for="radio-tweetId-5">5</label>
			</div>
			<p class="text-sm text-gray-400">Misinformation</p>
		</div>
	</div>
	`,
};

const TweetContent = {
	props: ["tweetId", "user", "content", "meta"],
	data() {
		return {
			userImg: (this.user.img) ? this.user.img : `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`,
		}
	},
	template: `
	<div class="tweet p-4 flex flex-row space-x-4 w-full">
		<div class="tweet-left flex-none">
			<div class="tweet-user-img">
				<img v-bind:src="userImg" alt="avatar" class="rounded-full w-14">
			</div>
		</div>
		<div class="tweet-right flex flex-col space-y-2 w-full">
			<div class="tweet-header">
				<div class="tweet-user flex flex-row items-center">
					<h4 class="font-semibold">{{ user.name }}</h4>
					<img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg" alt="verified" class="w-4 ml-1" v-if="user.verified">
				</div>
			</div>
			<div class="tweet-content">
				<p v-html="content" class="whitespace-pre-wrap"></p>
			</div>
			<div class="tweet-footer w-full">
				<div class="tweet-actions grid grid-cols-4 text-slate-500">
					<span>
						<ion-icon name="chatbox-outline" class="text-l leading-normal align-middle"></ion-icon>
						<span class="text-sm leading-normal align-middle ml-1">{{ meta.replies }}</span>
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

const Tweet = {
	props: ["tweetId", "user", "content", "meta"],
	components: {"TweetContent": TweetContent},
	template: `
	<div class="tweet-container border-b">
		<tweet-content :tweet-id="tweetId" :user="user" :content="content" :meta="meta"></tweet-content>
	</div>
	`,
};

const ExplainedTweet = {
	props: ["tweetId", "user", "content", "meta", "misinformationScore", "explanation", "explanationType"],
	components: {"TweetContent": TweetContent, "ExplanationDisplay": ExplanationDisplay},
	template: `
	<div class="tweet-container border-b flex flex-row">
		<tweet-content :tweet-id="tweetId" :user="user" :content="content" :meta="meta"></tweet-content>
		<div class="tweet-side">
			<explanation-display :explanation="explanation" :misinformation-score="misinformationScore" :explanation-type="explanationType"></explanation-display>
		</div>
	</div>
	`,
};

const SurveyTweet = {
	props: ["tweetId", "user", "content", "meta", "misinformationScore", "explanation", "explanationType"],
	components: {"TweetContent": TweetContent, "ExplanationDisplay": ExplanationDisplay, "UserSurveyComponent": UserSurveyComponent},
	template: `
	<div class="tweet-container border-b flex flex-row">
		<div class="flex flex-col w-full">
			<tweet-content :tweet-id="tweetId" :user="user" :content="content" :meta="meta"></tweet-content>
			<user-survey-component :tweet-id="tweetId"></user-survey-component>
		</div>
		<div class="tweet-side">
			<explanation-display :explanation="explanation" :misinformation-score="misinformationScore" :explanation-type="explanationType"></explanation-display>
		</div>
	</div>
	`,
};
