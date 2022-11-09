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
					<div class="explanation-score-bar-outer w-full border border-slate-300">
						<div class="explanation-score-bar-inner h-2" :style="{backgroundColor: colorscale(misinformationScore), width: misinformationScore * 100 + '%'}"></div>
					</div>
				</div>

				<div class="explanation-textscore">
					<h4 class="">Text Score</h4>
					<div class="explanation-score-bar-outer w-full border border-slate-300">
						<div class="explanation-score-bar-inner h-2" :style="{backgroundColor: colorscale(explanation.textScore), width: explanation.textScore * 100 + '%'}"></div>
					</div>
				</div>

				<div class="explanation-userscore">
					<h4 class="">User Score</h4>
					<div class="explanation-score-bar-outer w-full border border-slate-300">
						<div class="explanation-score-bar-inner h-2" :style="{backgroundColor: colorscale(explanation.userScore), width: explanation.userScore * 100 + '%'}"></div>
					</div>
				</div>

				<div class="explanation-linkscore" v-if="explanation.linkScore>=0">
					<h4 class="">Links Score</h4>
					<div class="explanation-score-bar-outer w-full border border-slate-300">
						<div class="explanation-score-bar-inner h-2" :style="{backgroundColor: colorscale(explanation.linkScore), width: explanation.linkScore * 100 + '%'}"></div>
					</div>
				</div>

				<div class="explanation-hashtagscore" v-if="explanation.hashtagScore>=0">
					<h4 class="">Hashtags Score</h4>
					<div class="explanation-score-bar-outer w-full border border-slate-300">
						<div class="explanation-score-bar-inner h-2" :style="{backgroundColor: colorscale(explanation.hashtagScore), width: explanation.hashtagScore * 100 + '%'}"></div>
					</div>
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
		<div class="tweet p-4 flex flex-row space-x-4">
			<div class="tweet-left flex-none">
				<div class="tweet-user-img">
					<img v-bind:src="userImg" alt="avatar" class="rounded-full w-14">
				</div>
			</div>
			<div class="tweet-right flex flex-col space-y-2 w-full">
				<div class="tweet-header">
					<div class="tweet-user flex flex-row items-center">
						<h4 class="font-semibold">{{ user.name }}</h4>
					</div>
				</div>
				<div class="tweet-content">
					<p v-html="content" class=""></p>
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
