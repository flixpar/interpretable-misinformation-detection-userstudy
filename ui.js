export { Tweet, ExplanationDisplay };


const ExplanationDisplay = {
	props: ["misinformationScore", "explanation"],
	data() {
		let scoreColor = "bg-green-500";
		if (this.misinformationScore >= 0.7) {
			scoreColor = "bg-red-500";
		} else if (this.misinformationScore >= 0.4) {
			scoreColor = "bg-yellow-500";
		}

		return {
			"showExplanation": (this.misinformationScore >= 0.4),
			"hover": false,
			"scoreColor": scoreColor,
		}
	},
	template: `
	<div class="explanation-display h-full flex flex-row cursor-pointer" @mouseover="hover=true" @mouseleave="hover=false">
		<div class="misinforamtion-score-bar h-full">
			<div class="misinformation-score-bar-inner" :class="['h-full w-1', scoreColor]"></div>
		</div>
		<div class="explanation absolute bg-slate-50 p-4 rounded text-sm w-72 ml-1" v-if="showExplanation" v-show="hover">
			<div class="explanation-header border-b border-slate-300">
				<h3 class="font-semibold">Explanation</h3>
			</div>
			<div class="explanation-content">
				<div class="explanation-content-score">
					<h4 class="font-semibold">Score</h4>
					<div class="explanation-score-bar-outer h-2 w-full border border-slate-300">
						<div class="explanation-score-bar-inner h-2" v-bind:class="scoreColor" v-bind:style="{width: misinformationScore * 100 + '%'}"></div>
					</div>
				</div>
				<div class="explanation-content-topics">
					<h4 class="font-semibold">Topics</h4>
					<ul class="list-disc list-inside">
						<li v-for="topic in explanation.topics">{{ topic }}</li>
					</ul>
				</div>
				<div class="explanation-content-phrases">
					<h4 class="font-semibold">Phrases</h4>
					<ul class="list-disc list-inside">
						<li v-for="phrase in explanation.phrases">{{ phrase }}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	`
};

const Tweet = {
	props: ["user", "content", "meta", "misinformationScore", "explanation"],
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
			<explanation v-bind:explanation="explanation" v-bind:misinformation-score="misinformationScore"></explanation>
		</div>
	</div>
	`
};
