export {getTweets};


let tweets = [
	{
		"id": "1344763622371823622",
		"user": {
			"id": "223344260",
			"name": "Cindy C Edwards",
			"username": "cindycedwards"
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
			"username": "Nesara311T"
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
			"username": "larryelder"
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
			"username": "ArienY1389"
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
			"username": "JuanDel93535298"
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
			"username": "AlecStapp"
		},
		"content": "Big news:\n\nSouth Korea reverses its previous plan to phase out nuclear energy.\n\nIncoming government cites rising greenhouse gas emissions and Russian invasion of Ukraine as reasons to invest more in nuclear power. https://t.co/fjdFhDu1xc",
		"meta": {
			"likes": 1150,
			"retweets": 160,
			"replies": 15
		},
		"misinformationScore": 0.0,
		"explanation": {
			"textScore": 0.0,
			"linkScore": 0.0,
			"hashtagScore": 0.0,
			"userScore": 0.0,
			"engagementScore": 0.0
		}
	},
	{
		"id": "1590054649012178944",
		"user": {
			"id": "1437478379511500801",
			"name": "The Baltimore Banner",
			"username": "BaltimoreBanner"
		},
		"content": "Baltimore City Elections Director Armstead Jones has been hospitalized. \n\nDeputy Director Abigail Goldman will oversee operations at polling places across the city in his absence. https://t.co/OBBIVhcMp1",
		"meta": {
			"likes": 24,
			"retweets": 27,
			"replies": 3
		},
		"misinformationScore": 0.0,
		"explanation": {
			"textScore": 0.0,
			"linkScore": 0.0,
			"hashtagScore": 0.0,
			"userScore": 0.0,
			"engagementScore": 0.0
		}
	},
	{
		"id": "1590003755898097668",
		"user": {
			"id": "51241574",
			"name": "The Associated Press",
			"username": "AP"
		},
		"content": "A pair of dogs gifted by North Korean leader Kim Jong Un in 2018 are now mired in a South Korean political row, with the country's former president blaming his conservative successor for a lack of financial support as he gave the animals up.  https://t.co/MFKn5RMfVx",
		"meta": {
			"likes": 28,
			"retweets": 15,
			"replies": 6
		},
		"misinformationScore": 0.0,
		"explanation": {
			"textScore": 0.0,
			"linkScore": 0.0,
			"hashtagScore": 0.0,
			"userScore": 0.0,
			"engagementScore": 0.0
		}
	},
	{
		"id": "1589659716246175746",
		"user": {
			"id": "14959056",
			"name": "Lisa Sy",
			"username": "lisasy"
		},
		"content": "There's a lot of job uncertainty right now with the recession. i grew my design career through the last decade after the recovery from the 2008 downturn.\n\nHere is advice I give to current college students/soon grads who may be graduating into the recession:",
		"meta": {
			"likes": 46,
			"retweets": 2,
			"replies": 3
		},
		"misinformationScore": 0.0,
		"explanation": {
			"textScore": 0.0,
			"linkScore": 0.0,
			"hashtagScore": 0.0,
			"userScore": 0.0,
			"engagementScore": 0.0
		}
	},
	{
		"id": "1590321058384527360",
		"user": {
			"id": "1360246645087219716",
			"name": "Philosophy of Mind",
			"username": "Phi_of_Mind"
		},
		"content": "Accept what you can't change. Change what you can't accept.",
		"meta": {
			"likes": 246,
			"retweets": 59,
			"replies": 4
		},
		"misinformationScore": 0.0,
		"explanation": {
			"textScore": 0.0,
			"linkScore": 0.0,
			"hashtagScore": 0.0,
			"userScore": 0.0,
			"engagementScore": 0.0
		}
	}
];

function getTweets() {
	const tweetsShuffled = tweets.sort((a, b) => 0.5 - Math.random());
	return tweetsShuffled;
}
