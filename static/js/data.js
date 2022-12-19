export { getAllTweets, getTweetGroup, getExampleTweets, getStaticTweets, getTweetGroupOrder };


function getAllTweets() {
	return fetch("/tweets")
		.then(response => response.json())
		.then(tweets => tweets.sort((a, b) => (a.tweetId < b.tweetId) ? 1 : -1));
}

function getTweetGroup(tweetGroupNum) {
	return fetch("/tweets")
		.then(response => response.json())
		.then(tweets => tweets.filter(tweet => tweet.tweetGroup === tweetGroupNum))
		.then(tweets => tweets.sort((a, b) => (a.tweetId < b.tweetId) ? 1 : -1));
}

function getExampleTweets() {
	return fetch("/tweets/examples")
		.then(response => response.json());
}

function getStaticTweets() {
	return fetch("data/userstudy_tweets.json")
		.then(response => response.json());
}

function getTweetGroupOrder(userGroup) {
	switch (userGroup) {
		case 1:
			return [1, 2, 3];
		case 2:
			return [1, 3, 2];
		case 3:
			return [2, 1, 3];
		case 4:
			return [2, 3, 1];
		case 5:
			return [3, 1, 2];
		case 6:
			return [3, 2, 1];
	}
}
