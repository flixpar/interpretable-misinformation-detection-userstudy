from flask import Flask, render_template, send_file, request, session, jsonify
import os

from surveydb import db_session, User, TweetResponse

app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY")


@app.route("/")
def index():
	return render_template("index.html")

@app.route("/tweets")
def tweets():
	return send_file("data/userstudy_tweets.json")

@app.route("/survey/intro")
def survey_intro():
	return render_template("survey-intro.html")

@app.route("/survey/user", methods=["GET"])
def survey_user():
	return render_template("survey-user.html")

@app.route("/survey/<int:user_group>/<int:explanation_level>", methods=["GET"])
def survey(user_group, explanation_level):
	return render_template("survey.html")

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
	user = User(email=request_data["email"], name=request_data["name"], age=request_data["age"])
	db_session.add(user)
	db_session.commit()
	session["user_id"] = user.id
	return jsonify(success=True)

@app.route("/responses")
def responses():
	responses = db_session.query(TweetResponse).all()
	return jsonify([r.serialize for r in responses])

@app.route("/users")
def users():
	users = db_session.query(User).all()
	return jsonify([u.serialize for u in users])

@app.route("/reset-db")
def reset_db():
	db_session.query(TweetResponse).delete()
	db_session.query(User).delete()
	db_session.commit()
	return jsonify(success=True)

@app.teardown_appcontext
def shutdown_session(exception=None):
	db_session.remove()
