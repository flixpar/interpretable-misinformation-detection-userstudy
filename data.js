export {getTweets};


let tweets = [
	{
		"id": "1344763622371823622",
		"user": {
			"id": "223344260",
			"name": "Cindy C Edwards",
			"username": "cindycedwards",
			"img": "https://pbs.twimg.com/profile_images/1191003746/DSCF0077_0083_normal.jpg"
		},
		"content": "Former FEMA operative Celeste Solum talks with David Icke: \u2018The Covid tests are magnetically tagging you and the vaccine is designed for mass depopulation and the synthetic transformation of the human body\u2019 https://t.co/5bSXxHD1N1",
		"meta": {
			"likes": 0,
			"retweets": 0,
			"replies": 0
		},
		"misinformationScore": 0.95,
		"explanation": {
			"textScore": 0.8,
			"linkScore": 0.95,
			"hashtagScore": -1,
			"userScore": 0.85,
			"engagementScore": 0.5
		}
	},
	{
		"id": "1344415277728100360",
		"user": {
			"id": "471883962",
			"name": "K Thomas",
			"username": "Nesara311T",
			"img": "https://pbs.twimg.com/profile_images/1119048486442471425/VO8qMl4G_normal.jpg"
		},
		"content": "Is it fake news? A toxic vaccine? \nI strongly support zBig Don T!\n\nBut today a high ranking republican died after that Jab.\n     Oh...throw the bidens in jail. Anyone into off grid.must be anti violence pro off grid contact",
		"meta": {
			"likes": 0,
			"retweets": 0,
			"replies": 0
		},
		"misinformationScore": 0.8,
		"explanation": {
			"textScore": 0.8,
			"linkScore": -1,
			"hashtagScore": -1,
			"userScore": 0.95,
			"engagementScore": 0.5
		}
	},
	{
		"id": "1326131980413542400",
		"user": {
			"id": "195271137",
			"name": "Larry Elder",
			"username": "larryelder",
			"img": "https://pbs.twimg.com/profile_images/1432945762283888642/5Kt71_Mt_normal.jpg"
		},
		"content": "YOU DECIDE--'CONSPIRACY THEORY'?\n\nInfamous \u2018Hoax\u2019 Artist Behind Trumpworld\u2019s New Voter Fraud Claim\nhttps://t.co/1wF6XIHLZo\n\nvs.\n\nLt. Gen Thomas Mcinerney Exposes CIA Software 'Hammer/Scorecard,' Warned It Will Change Votes By 3%\nhttps://t.co/1T8rMmqGRk\n\n#ThePostElection",
		"meta": {
			"likes": 416,
			"retweets": 118,
			"replies": 45
		},
		"misinformationScore": 0.75,
		"explanation": {
			"textScore": 0.7,
			"linkScore": 0.8,
			"hashtagScore": -1,
			"userScore": 0.6,
			"engagementScore": 0.4
		}
	},
	{
		"id": "1588683756743053317",
		"user": {
			"id": "1488696626054983681",
			"name": "Arien Y",
			"username": "ArienY1389",
			"img": "https://pbs.twimg.com/profile_images/1488720601984372737/9p1GqEDY_normal.jpg"
		},
		"content": "As noted by Dr. Charles Hoffe in a September 15, 2022, interview with Laura-Lynn Tyler Thompson, \u201cThe more shots you get, the more likely you will die from COVID-19.\u201d An excerpt from the interview is included above. You can find the full interview on Bitchute.14 https://t.co/cmAWYlK4Cr",
		"meta": {
			"likes": 2,
			"retweets": 0,
			"replies": 0
		},
		"misinformationScore": 0.65,
		"explanation": {
			"textScore": 0.45,
			"linkScore": 0.75,
			"hashtagScore": -1,
			"userScore": 0.58,
			"engagementScore": 0.52
		}
	},
	{
		"id": "1321240805965733889",
		"user": {
			"id": "999117662776188928",
			"name": "Juan D.",
			"username": "JuanDel93535298",
			"img": "https://pbs.twimg.com/profile_images/1521897628606287873/zTE7Bk1o_normal.jpg"
		},
		"content": "Trump Was RIGHT And Project Veritas Proved It, MASSIVE Voter Fraud Uncov... https://t.co/LIMbiRWHIJ via @YouTube",
		"meta": {
			"likes": 0,
			"retweets": 0,
			"replies": 0
		},
		"misinformationScore": 0.88,
		"explanation": {
			"textScore": 0.9,
			"linkScore": 0.55,
			"hashtagScore": -1,
			"userScore": 0.55,
			"engagementScore": -1
		}
	},
	{
		"id": "1514263463706730507",
		"user": {
			"id": "48111864",
			"name": "Alec Stapp",
			"username": "AlecStapp",
			"img": "https://pbs.twimg.com/profile_images/1498170157176393731/tyrdhQ1M_normal.jpg"
		},
		"content": "Big news:\n\nSouth Korea reverses its previous plan to phase out nuclear energy.\n\nIncoming government cites rising greenhouse gas emissions and Russian invasion of Ukraine as reasons to invest more in nuclear power. https://t.co/fjdFhDu1xc",
		"meta": {
			"likes": 1150,
			"retweets": 160,
			"replies": 15
		},
		"misinformationScore": 0.4,
		"explanation": {
			"textScore": 0.5,
			"linkScore": 0.4,
			"hashtagScore": -1,
			"userScore": 0.2,
			"engagementScore": 0.2
		}
	},
	{
		"id": "1590054649012178944",
		"user": {
			"id": "1437478379511500801",
			"name": "The Baltimore Banner",
			"username": "BaltimoreBanner",
			"img": "https://pbs.twimg.com/profile_images/1491109942379659268/J-qlQE9W_normal.png"
		},
		"content": "Baltimore City Elections Director Armstead Jones has been hospitalized. \n\nDeputy Director Abigail Goldman will oversee operations at polling places across the city in his absence. https://t.co/OBBIVhcMp1",
		"meta": {
			"likes": 24,
			"retweets": 27,
			"replies": 3
		},
		"misinformationScore": 0.3,
		"explanation": {
			"textScore": 0.6,
			"linkScore": 0.1,
			"hashtagScore": -1,
			"userScore": 0.1,
			"engagementScore": 0.2
		}
	},
	{
		"id": "1590003755898097668",
		"user": {
			"id": "51241574",
			"name": "The Associated Press",
			"username": "AP",
			"img": "https://pbs.twimg.com/profile_images/461964160838803457/8z9FImcv_normal.png"
		},
		"content": "A pair of dogs gifted by North Korean leader Kim Jong Un in 2018 are now mired in a South Korean political row, with the country's former president blaming his conservative successor for a lack of financial support as he gave the animals up.  https://t.co/MFKn5RMfVx",
		"meta": {
			"likes": 28,
			"retweets": 15,
			"replies": 6
		},
		"misinformationScore": 0.05,
		"explanation": {
			"textScore": 0.1,
			"linkScore": 0.0,
			"hashtagScore": -1,
			"userScore": 0.0,
			"engagementScore": 0.1
		}
	},
	{
		"id": "1589659716246175746",
		"user": {
			"id": "14959056",
			"name": "Lisa Sy",
			"username": "lisasy",
			"img": "https://pbs.twimg.com/profile_images/1551816869429985280/pvpvQbgY_normal.jpg"
		},
		"content": "There's a lot of job uncertainty right now with the recession. i grew my design career through the last decade after the recovery from the 2008 downturn.\n\nHere is advice I give to current college students/soon grads who may be graduating into the recession:",
		"meta": {
			"likes": 46,
			"retweets": 2,
			"replies": 3
		},
		"misinformationScore": 0.48,
		"explanation": {
			"textScore": 0.5,
			"linkScore": -1,
			"hashtagScore": -1,
			"userScore": 0.4,
			"engagementScore": 0.2
		}
	},
	{
		"id": "1590321058384527360",
		"user": {
			"id": "1360246645087219716",
			"name": "Philosophy of Mind",
			"username": "Phi_of_Mind",
			"img": "https://pbs.twimg.com/profile_images/1521434102083239936/KIbSi8Ri_normal.jpg"
		},
		"content": "Accept what you can't change. Change what you can't accept.",
		"meta": {
			"likes": 273,
			"retweets": 64,
			"replies": 4
		},
		"misinformationScore": 0.4,
		"explanation": {
			"textScore": 0.5,
			"linkScore": -1,
			"hashtagScore": -1,
			"userScore": 0.2,
			"engagementScore": 0.4
		}
	}
];

function getTweets() {
	const tweetsShuffled = tweets.sort((a, b) => a["user"]["id"] >= b["user"]["id"] ? -1 : 1);
	return tweetsShuffled;
}
