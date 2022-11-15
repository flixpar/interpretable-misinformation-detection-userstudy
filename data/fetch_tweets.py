import requests
import os


tweet_ids = [
	# false
	"1344763622371823622",
	"1344415277728100360",
	"1326131980413542400",
	"1588683756743053317",
	"1321240805965733889",

	# true
	"1514263463706730507",
	"1590054649012178944",
	"1590003755898097668",
	"1589659716246175746",
	"1590321058384527360"
]
payload = {
	"ids": ",".join(tweet_ids),
	"tweet.fields": "created_at,public_metrics",
	"expansions": "author_id",
	"user.fields": "name,username,verified,profile_image_url",
}

url = "https://api.twitter.com/2/tweets"

bearer_token = os.environ["TWITTER_BEARER_TOKEN"]
headers = {
	"Authorization": f"Bearer {bearer_token}",
}

response = requests.request("GET", url, headers=headers, data=payload)

with open("sample_tweets_raw.json", "w") as f:
	f.write(response.text)
