export {Tweet};


const Tweet = {
	props: ["user", "content", "meta"],
	data() {
		return {
			userImg: (this.user.img) ? this.user.img : `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y`,
		}
	},
	template: `
	<div class="tweet border-b p-4 flex flex-row space-x-4">
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
						<span class="text-sm leading-normal align-middle ml-1">{{ meta.comments }}</span>
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
