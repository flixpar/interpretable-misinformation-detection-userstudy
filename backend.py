from flask import Flask, render_template, send_file, request, session, jsonify
import os

from surveydb import db_session, User, TweetResponse, UserFeedback

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY")


@app.route("/")
def index():
	return render_template("index.html")

@app.route("/tweets")
def tweets():
	return send_file("data/userstudy_tweets.json")

@app.route("/tweets/examples")
def example_tweets():
	return send_file("data/sample_tweets.json")

@app.route("/survey/intro")
def survey_intro():
	return render_template("survey-intro.html")

@app.route("/survey/user", methods=["GET"])
def survey_user():
	return render_template("survey-user.html")

@app.route("/survey/<int:user_group>/<int:explanation_level>", methods=["GET"])
def survey(user_group, explanation_level):
	return render_template("survey.html")

@app.route("/survey/feedback")
def survey_feedback():
	return render_template("survey-feedback.html")

@app.route("/survey/complete")
def survey_complete():
	return render_template("survey-complete.html")

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

@app.route("/survey/user", methods=["POST"])
def handle_user():
	request_data = request.get_json()
	user = User(email=request_data["email"], name=request_data["name"], age=request_data["age"], group=request_data["group"])
	db_session.add(user)
	db_session.commit()
	session["user_id"] = user.id
	return jsonify(success=True)

@app.route("/survey/feedback", methods=["POST"])
def handle_feedback():
	request_data = request.get_json()
	user_id = session.get("user_id", -1)

	feedback = UserFeedback(
		user_id=user_id,
		difficultyUnassisted=request_data["difficulty-noassistance"],
		difficultyAssisted=request_data["difficulty-assisted"],
		predictionUsefulness=request_data["useful-preds"],
		explanationUsefulness=request_data["useful-expl"],
		agreementFrequency=request_data["agree-freq"],
		comments=request_data["comments"],
	)
	db_session.add(feedback)

	user = User.query.filter_by(id=user_id).first()
	user.complete()

	db_session.commit()
	return jsonify(success=True)

@app.route("/responses")
def responses():
	responses = db_session.query(TweetResponse).all()
	return jsonify([r.serialize for r in responses])

@app.route("/users")
def users():
	users = db_session.query(User).all()
	return jsonify([u.serialize for u in users])

@app.route("/feedback")
def feedback():
	feedback = db_session.query(UserFeedback).all()
	return jsonify([f.serialize for f in feedback])

@app.route("/reset-db")
def reset_db():
	db_session.query(TweetResponse).delete()
	db_session.query(User).delete()
	db_session.commit()
	return jsonify(success=True)

@app.teardown_appcontext
def shutdown_session(exception=None):
	db_session.remove()
