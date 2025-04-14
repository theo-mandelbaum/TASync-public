from ninja import NinjaAPI, Schema
import uuid
from datetime import date
from scheduling.models import Subject, School, User, Question, Schedule, Shift
from typing import List, Optional
from ninja.security import HttpBearer


class AuthBearer(HttpBearer):
    def authenticate(self, request, token):
        if request.user.is_authenticated:
            return request.user
        return None


sched_api = NinjaAPI(urls_namespace="sched_api",
                     title="Sched API", version="1.0", auth=AuthBearer())


class SchoolSchema(Schema):
    id: uuid.UUID
    name: str


class SubjectSchema(Schema):
    name: str


class UserSchema(Schema):
    username: str
    name: str
    school: SchoolSchema
    subjects: List[SubjectSchema]


class QuestionSchema(Schema):
    question_text: str
    asker: UserSchema
    subject: SubjectSchema
    date_asked: date
    is_answered: bool


class ScheduleSchema(Schema):
    is_ta_hours: bool
    educator: UserSchema
    time_blocks: dict


class ShiftSchema(Schema):
    id: uuid.UUID
    schedule: ScheduleSchema
    start_time: date
    end_time: date
    day_of_week: str
    date: date
    max_ta: int
    max_students: int
    ta: List[UserSchema]
    students: List[UserSchema]


class Error(Schema):
    message: str


@sched_api.get("/schools", response=List[SchoolSchema], auth=None)
def list_schools(request):
    schools = School.objects.all()
    return schools


@sched_api.get("/schools_paginated", response=List[SchoolSchema], auth=None)
def list_schools_paginated(request, page: int = 1, page_size: int = 10):
    schools = School.objects.all()
    start = (page - 1) * page_size
    end = start + page_size
    if end < len(schools):
        return schools[start:end]
    else:
        return None


@sched_api.get("/ta_shifts", response={200: List[ShiftSchema], 403: Error})
def list_ta_shifts(request):
    group_name = request.user.group.name
    if group_name == "TA":
        shifts = Shift.objects.filter(ta__id=request.user.id)
        return 200, shifts
    else:
        return 403, {"message": "You are not authorized to view this resource."}
