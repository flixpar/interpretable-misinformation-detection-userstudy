from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
import datetime


engine = create_engine("sqlite:///survey.db", convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

class User(Base):
	__tablename__ = "users"
	id = Column(Integer, primary_key=True)
	email = Column(String(120), unique=True)
	name = Column(String(120))
	age = Column(Integer)
	social_media_use = Column(Integer)
	group = Column(Integer)
	start_time = Column(DateTime, default=datetime.datetime.now)
	end_time = Column(DateTime)

	def __init__(self, email=None, name=None, age=None, group=None, social_media_use=None):
		self.email = email
		self.name = name
		self.age = age
		self.group = group
		self.social_media_use = social_media_use

	def complete(self):
		self.end_time = datetime.datetime.now()

	def __repr__(self):
		return f"User: {self.name}"

	@property
	def serialize(self):
		return {
			"id": self.id,
			"email": self.email,
			"name": self.name,
			"age": self.age,
			"group": self.group,
			"social_media_use": self.social_media_use,
			"start_time": self.start_time,
			"end_time": self.end_time,
		}

class TweetResponse(Base):
	__tablename__ = "responses"
	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey("users.id"))
	user = relationship("User", backref="responses")
	tweet_id = Column(String(120))
	response = Column(Integer)
	explanation_level = Column(String(120))
	created = Column(DateTime, default=datetime.datetime.now)

	def __init__(self, tweet_id=None, user_id=None, response=None, explanation_level=None):
		self.tweet_id = tweet_id
		self.user_id = user_id
		self.response = response
		self.explanation_level = explanation_level

	def __repr__(self):
		return f"{self.tweet_id}: {self.response}"

	@property
	def serialize(self):
		return {
			"tweet_id": self.tweet_id,
			"user_id": self.user_id,
			"response": self.response,
			"explanation_level": self.explanation_level,
			"created": self.created
		}

class UserFeedback(Base):
	__tablename__ = "feedback"
	id = Column(Integer, primary_key=True)
	user_id = Column(Integer, ForeignKey("users.id"))
	user = relationship("User", backref="feedback")
	difficultyUnassisted = Column(Integer)
	difficultyAssisted = Column(Integer)
	predictionUsefulness = Column(Integer)
	explanationUsefulness = Column(Integer)
	agreementFrequency = Column(Integer)
	comments = Column(Text)
	created = Column(DateTime, default=datetime.datetime.now)

	def __init__(self, user_id=None, difficultyUnassisted=None, difficultyAssisted=None, predictionUsefulness=None, explanationUsefulness=None, agreementFrequency=None, comments=None):
		self.user_id = user_id
		self.difficultyUnassisted = difficultyUnassisted
		self.difficultyAssisted = difficultyAssisted
		self.predictionUsefulness = predictionUsefulness
		self.explanationUsefulness = explanationUsefulness
		self.agreementFrequency = agreementFrequency
		self.comments = comments

	def __repr__(self):
		return f"{self.user_id}: {self.explanationUsefulness}"

	@property
	def serialize(self):
		return {
			"user_id": self.user_id,
			"difficultyUnassisted": self.difficultyUnassisted,
			"difficultyAssisted": self.difficultyAssisted,
			"predictionUsefulness": self.predictionUsefulness,
			"explanationUsefulness": self.explanationUsefulness,
			"agreementFrequency": self.agreementFrequency,
			"comments": self.comments,
			"created": self.created
		}

def init_db():
	Base.metadata.create_all(bind=engine)
