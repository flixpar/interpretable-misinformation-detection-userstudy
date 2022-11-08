export {getTweets};


let tweets = [
	{
		user: {
			name: "President Biden",
			username: "POTUS",
			img: "https://pbs.twimg.com/profile_images/1380530524779859970/TfwVAbyX_400x400.jpg",
		},
		content: "I'll do what it takes to bring inflation down.<br>But I won't accept the Republican argument that too many Americans have found good jobs and have more dignity in the workplace.  Or that our largest, most profitable corporations shouldn't have to pay their fair share.",
		meta: {retweets: "3,563", likes: "12.4K", comments: "5,614"},
		misinformationScore: 0.75,
		explanation: {
			phrases: ["inflation", "fair share"],
			badLinks: [],
			topics: ["inflation", "economy"],
		},
	},
	{
		user: {
			name: "President Biden",
			username: "POTUS",
			img: "https://pbs.twimg.com/profile_images/1380530524779859970/TfwVAbyX_400x400.jpg",
		},
		content: "Ted Cruz said that folks who are receiving student debt relief are a bunch of \"slackers.\"<br>Who in God's name do these guys think they are?",
		meta: {retweets: "16.3K", likes: "93.2K", comments: "22.4K"},
		misinformationScore: 0,
		explanation: {
			phrases: [],
			badLinks: [],
			topics: [],
		},
	}
];

function getTweets() {
	return tweets;
}
