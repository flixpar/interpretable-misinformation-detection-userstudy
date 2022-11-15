export { Tweet, ExplanationDisplay };


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
	props: ["score"],
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
		<div class="score-bar-outer w-full border border-slate-300">
			<div class="score-bar-inner h-2" :style="{backgroundColor: this.color, width: this.barWidth, marginLeft: this.margin}"></div>
			<span class="score-bar-divider" style="margin-left: 50%; width: 2px; background-color: black;"></span>
			<p class="text-xs text-center" hidden>{{(score*100).toFixed(0)}}%</p>
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
				<div class="explanation-overallscore">
					<h4 class="font-semibold">Overall Score</h4>
					<score-bar :score="misinformationScore"></score-bar>
				</div>
				<div class="explanation-textscore">
					<h4 class="">Text Score</h4>
					<score-bar :score="explanation.textScore"></score-bar>
				</div>
				<div class="explanation-userscore">
					<h4 class="">User Score</h4>
					<score-bar :score="explanation.userScore"></score-bar>
				</div>
				<div class="explanation-linkscore" v-if="explanation.linkScore>=0">
					<h4 class="">Links Score</h4>
					<score-bar :score="explanation.linkScore"></score-bar>
				</div>
			</div>
		</div>
	</div>
	`
};

const Tweet = {
	props: ["user", "content", "meta", "misinformationScore", "explanation", "explanationType"],
	data() {
		return {
			userImg: (this.user.img) ? this.user.img : `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`,
		}
	},
	components: {"explanation": ExplanationDisplay},
	template: `
	<div class="tweet-container border-b flex flex-row">
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
		<div class="tweet-side">
			<explanation :explanation="explanation" :misinformation-score="misinformationScore" :explanation-type="explanationType"></explanation>
		</div>
	</div>
	`
};
