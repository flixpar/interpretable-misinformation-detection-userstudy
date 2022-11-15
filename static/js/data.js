export { getTweets };


function getTweets() {
	return fetch("/tweets")
		.then(response => response.json())
		.then(tweets => tweets.sort((a, b) => a["user"]["id"] >= b["user"]["id"] ? -1 : 1));
}
