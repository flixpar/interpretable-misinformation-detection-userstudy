import pandas as pd
import requests
import os


rawdata = pd.read_csv("userstudy_rawdata.csv", dtype={"tweet_id": str})
tweet_ids = rawdata.tweet_id.unique()
tweet_ids = tweet_ids.tolist()

payload = {
	"ids": ",".join(tweet_ids),
	"tweet.fields": "created_at,public_metrics,entities",
	"expansions": "author_id",
	"user.fields": "name,username,verified,profile_image_url",
}

url = "https://api.twitter.com/2/tweets"

bearer_token = os.environ["TWITTER_BEARER_TOKEN"]
headers = {
	"Authorization": f"Bearer {bearer_token}",
}

response = requests.request("GET", url, headers=headers, data=payload)

with open("userstudy_tweets_raw.json", "w") as f:
	f.write(response.text)
