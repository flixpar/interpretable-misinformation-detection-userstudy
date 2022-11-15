import json


tweet_misinformation_data = {
	"1344763622371823622": {
		"misinformationScore": 0.95,
		"explanation": {
			"textScore": 0.8,
			"linkScore": 0.95,
			"userScore": 0.85,
			"engagementScore": 0.5
		}
	},
	"1344415277728100360": {
		"misinformationScore": 0.8,
		"explanation": {
			"textScore": 0.8,
			"linkScore": -1,
			"userScore": 0.95,
			"engagementScore": 0.5
		}
	},
	"1326131980413542400": {
		"misinformationScore": 0.75,
		"explanation": {
			"textScore": 0.7,
			"linkScore": 0.8,
			"userScore": 0.6,
			"engagementScore": 0.4
		}
	},
	"1588683756743053317": {
		"misinformationScore": 0.65,
		"explanation": {
			"textScore": 0.45,
			"linkScore": 0.75,
			"userScore": 0.58,
			"engagementScore": 0.52
		}
	},
	"1321240805965733889": {
		"misinformationScore": 0.88,
		"explanation": {
			"textScore": 0.9,
			"linkScore": 0.55,
			"userScore": 0.55,
			"engagementScore": -1
		}
	},
	"1514263463706730507": {
		"misinformationScore": 0.0,
		"explanation": {
			"textScore": 0.0,
			"linkScore": 0.0,
			"userScore": 0.0,
			"engagementScore": 0.0,
		}
	},
	"1590054649012178944": {
		"misinformationScore": 0.0,
		"explanation": {
			"textScore": 0.0,
			"linkScore": 0.0,
			"userScore": 0.0,
			"engagementScore": 0.0,
		}
	},
	"1590003755898097668": {
		"misinformationScore": 0.0,
		"explanation": {
			"textScore": 0.0,
			"linkScore": 0.0,
			"userScore": 0.0,
			"engagementScore": 0.0,
		}
	},
	"1589659716246175746": {
		"misinformationScore": 0.0,
		"explanation": {
			"textScore": 0.0,
			"linkScore": 0.0,
			"userScore": 0.0,
			"engagementScore": 0.0,
		}
	},
	"1590321058384527360": {
		"misinformationScore": 0.0,
		"explanation": {
			"textScore": 0.0,
			"linkScore": 0.0,
			"userScore": 0.0,
			"engagementScore": 0.0,
		}
	},
	"1514263463706730507": {
		"misinformationScore": 0.4,
		"explanation": {
			"textScore": 0.5,
			"linkScore": 0.4,
			"userScore": 0.2,
			"engagementScore": 0.2
		}
	},
	"1590054649012178944": {
		"misinformationScore": 0.3,
		"explanation": {
			"textScore": 0.6,
			"linkScore": 0.1,
			"userScore": 0.1,
			"engagementScore": 0.2
		}
	},
	"1590003755898097668": {
		"misinformationScore": 0.05,
		"explanation": {
			"textScore": 0.1,
			"linkScore": 0.0,
			"userScore": 0.0,
			"engagementScore": 0.1
		}
	},
	"1589659716246175746": {
		"misinformationScore": 0.48,
		"explanation": {
			"textScore": 0.5,
			"linkScore": -1,
			"userScore": 0.4,
			"engagementScore": 0.2
		}
	},
	"1590321058384527360": {
		"misinformationScore": 0.4,
		"explanation": {
			"textScore": 0.5,
			"linkScore": -1,
			"userScore": 0.2,
			"engagementScore": 0.4
		}
	},
}

with open("sample_tweets_raw.json", "r") as f:
	data = json.load(f)

tweets_raw = data["data"]

users_raw = data["includes"]["users"]
users = {user["id"]: user for user in users_raw}

def process_tweet(tweet):
	tweet = {
		"id": tweet["id"],
		"user": {
			"id": tweet["author_id"],
			"name": users[tweet["author_id"]]["name"],
			"username": users[tweet["author_id"]]["username"],
			"verified": users[tweet["author_id"]]["verified"],
			"img": users[tweet["author_id"]]["profile_image_url"],
		},
		"content": tweet["text"],
		"meta": {
			"likes": tweet["public_metrics"]["like_count"],
			"retweets": tweet["public_metrics"]["retweet_count"],
			"replies": tweet["public_metrics"]["reply_count"],
		},
		"misinformationScore": tweet_misinformation_data[tweet["id"]]["misinformationScore"],
		"explanation": tweet_misinformation_data[tweet["id"]]["explanation"],
	}
	return tweet

tweets = [process_tweet(tweet) for tweet in tweets_raw]

with open("sample_tweets.json", "w") as f:
	json.dump(tweets, f, indent="\t")
