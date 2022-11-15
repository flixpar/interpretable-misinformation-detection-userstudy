from flask import Flask, render_template

from surveydb import db_session, User, TweetResponse

app = Flask(__name__)


@app.route("/")
def index():
	return render_template("index.html")

@app.teardown_appcontext
def shutdown_session(exception=None):
	db_session.remove()
