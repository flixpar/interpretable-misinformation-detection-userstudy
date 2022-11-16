import requests
import pandas as pd


base_url = "https://iml.felixparker.com"
user_response = requests.request("GET", base_url + "/users").json()
survey_response = requests.request("GET", base_url + "/responses").json()
feedback_response = requests.request("GET", base_url + "/feedback").json()

user_df = pd.DataFrame(user_response)
survey_df = pd.DataFrame(survey_response)
feedback_df = pd.DataFrame(feedback_response)

col_order_user = ["id", "name", "email", "age", "social_media_use", "group", "start_time", "end_time"]
col_order_survey = ["user_id", "tweet_id", "explanation_level", "response", "created"]
col_order_feedback = ["user_id", "created", "difficultyUnassisted", "difficultyAssisted", "predictionUsefulness", "explanationUsefulness", "agreementFrequency", "comments"]

user_df = user_df[col_order_user]
survey_df = survey_df[col_order_survey]
feedback_df = feedback_df[col_order_feedback]

user_df.start_time = pd.to_datetime(user_df.start_time)
user_df.end_time = pd.to_datetime(user_df.end_time)
survey_df.created = pd.to_datetime(survey_df.created)
feedback_df.created = pd.to_datetime(feedback_df.created)

user_df.to_csv("data/users.csv", index=False)
survey_df.to_csv("data/responses.csv", index=False)
feedback_df.to_csv("data/feedback.csv", index=False)
