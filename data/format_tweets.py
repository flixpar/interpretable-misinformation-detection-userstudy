import pandas as pd
import json
import re
import random


with open("userstudy_tweets_raw.json", "r") as f:
	twitter_raw = json.load(f)

tweets_raw = twitter_raw["data"]
tweets_raw = {tweet["id"]: tweet for tweet in tweets_raw}

users_raw = twitter_raw["includes"]["users"]
users = {user["id"]: user for user in users_raw}

data = pd.read_csv("../data/userstudy_rawdata.csv", dtype={"tweet_id": str}, na_values=["na"])
data_dict = {t["tweet_id"]: t for t in data.to_dict(orient="records")}

nan2none = lambda x: None if pd.isna(x) else x

explanation_data = {t["tweet_id"]: {
		"misinformationScore": t["overall_score"],
		"explanation": {
			"textScore": nan2none(t["text_score"]),
			"linkScore": nan2none(t["link_score"]),
			"userScore": nan2none(t["user_score"]),
		},
	} for t in data_dict.values()}

def process_content(tweet, real):
	text = tweet["text"]
	if real:
		if "entities" in tweet and "urls" in tweet["entities"]:
			link_tag = lambda u: f"<a href='{u['expanded_url']}' class='tweet-link'>{u['display_url']}</a>"
			for url_info in tweet["entities"]["urls"]:
				text = text.replace(url_info["url"], link_tag(url_info))
	else:
		urls = re.findall(r"(https?://[^\s]+)", text)
		for url in urls:
			display_url = url.replace("https://", "").replace("http://", "")
			if len(display_url) > 25:
				display_url = f"{display_url[:25]}..."
			text = text.replace(url, f"<a href='{url}' class='tweet-link'>{display_url}</a>")
	return text

def format_tweet(tweet_id):
	tweet = tweets_raw[tweet_id]
	tweet_ann = data_dict[tweet_id]

	if not tweet_ann["real"]:
		tweet["text"] = tweet_ann["text"]

	content = process_content(tweet, tweet_ann["real"])

	output = {
		"tweetId": tweet_id,
		"user": {
			"userId": tweet["author_id"],
			"name": users[tweet["author_id"]]["name"],
			"username": users[tweet["author_id"]]["username"],
			"verified": users[tweet["author_id"]]["verified"],
			"img": users[tweet["author_id"]]["profile_image_url"],
		},
		"content": content,
		"meta": {
			"likes": tweet["public_metrics"]["like_count"],
			"retweets": tweet["public_metrics"]["retweet_count"],
			"replies": tweet["public_metrics"]["reply_count"],
		},
		"misinformationScore": explanation_data[tweet_id]["misinformationScore"],
		"explanation": explanation_data[tweet_id]["explanation"],
		"real": tweet_ann["real"],
		"tweetGroup": (tweet_ids.index(tweet_id) % 3) + 1,
	}
	return output

tweet_ids = data.tweet_id.unique().tolist()
tweets = [format_tweet(tweet_id) for tweet_id in tweet_ids]

with open("userstudy_tweets.json", "w") as f:
	json.dump(tweets, f, indent="\t")
