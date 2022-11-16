from flask import Flask, render_template, send_file, request, session, jsonify

from surveydb import db_session, User, TweetResponse

app = Flask(__name__)


@app.route("/")
def index():
	return render_template("index.html")

@app.route("/tweets")
def tweets():
	return send_file("data/sample_tweets.json")

@app.route("/survey/<int:expl_level>", methods=["GET"])
def survey(expl_level):
	return render_template("survey.html")


@app.route("/survey", methods=["POST"])
def handle_survey():
	request_data = request.get_json()

	user_id = session.get("user_id", -1)
	explanation_level = request_data["explanationType"]

	for response in request_data["surveyResults"]:
		tweet_id = response["tweetId"]
		score = response["score"]
		tweet_response = TweetResponse(tweet_id=tweet_id, user_id=user_id, response=score, explanation_level=explanation_level)
		db_session.add(tweet_response)

	db_session.commit()
	return jsonify(success=True)

@app.route("/responses")
def responses():
	responses = db_session.query(TweetResponse).all()
	return jsonify([r.serialize for r in responses])

@app.route("/reset-db")
def reset_db():
	db_session.query(TweetResponse).delete()
	db_session.query(User).delete()
	db_session.commit()
	return jsonify(success=True)

@app.teardown_appcontext
def shutdown_session(exception=None):
	db_session.remove()
