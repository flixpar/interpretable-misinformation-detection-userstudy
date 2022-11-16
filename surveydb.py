from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
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
	group = Column(Integer)
	created = Column(DateTime, default=datetime.datetime.now)

	def __init__(self, email=None, name=None, age=None, group=None):
		self.email = email
		self.name = name
		self.age = age
		self.group = group

	def __repr__(self):
		return f"User: {self.name}"

	@property
	def serialize(self):
		return {
			"id": self.id,
			"email": self.email,
			"name": self.name,
			"age": self.age,
			"created": self.created,
			"group": self.group,
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

def init_db():
	Base.metadata.create_all(bind=engine)
