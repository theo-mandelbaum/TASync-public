from ninja import NinjaAPI, Schema
from scheduling.models import Subject, School, User, Question, Schedule
from typing import List, Optional

sched_api = NinjaAPI(urls_namespace="sched_api",
                     title="Sched API", version="1.0")


# class QuestionSchema(Schema):
#     question_text: str
#     asker: UserSchema


class SubjectSchema(Schema):
    name: str
