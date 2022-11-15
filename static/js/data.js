export { getTweets };


function getTweets() {
	return fetch("/tweets")
		.then(response => response.json())
		.then(tweets => tweets.sort((a, b) => a["user"]["userId"] >= b["user"]["userId"] ? -1 : 1));
}
