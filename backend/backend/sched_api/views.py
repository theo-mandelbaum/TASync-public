from functools import wraps
from ninja import NinjaAPI, Schema
import uuid
from datetime import date, time, datetime
from backend.scheduling.models import Subject, School, User, Question, Schedule, Shift, Comment, SwapRequest
from typing import List, Optional
from ninja.errors import HttpError


sched_api = NinjaAPI(urls_namespace="sched_api",
                     title="Sched API", version="1.0")


class SchoolSchema(Schema):
    id: uuid.UUID
    name: str


class SubjectSchema(Schema):
    id: uuid.UUID
    name: str


class SubjectCreateSchema(Schema):
    name: str


class UserSchema(Schema):
    username: str
    name: str
    school: Optional[SchoolSchema]
    subjects: List[SubjectSchema]


class QuestionSchema(Schema):
    id: uuid.UUID
    question_text: str
    asker: UserSchema
    subject: SubjectSchema
    date_asked: date
    is_answered: bool


class CommentSchema(Schema):
    id: uuid.UUID
    question: QuestionSchema
    user: UserSchema
    content: str
    date_posted: date


class QuestionCreateSchema(Schema):
    question_text: str


class ScheduleSchema(Schema):
    id: uuid.UUID
    is_ta_hours: bool
    educator: Optional[UserSchema]
    subject: SubjectSchema


class ScheduleSchemaCreate(Schema):
    is_ta_hours: bool


class ShiftSchema(Schema):
    id: uuid.UUID
    schedule: ScheduleSchema
    start_time: time
    end_time: time
    day_of_week: str
    date: Optional[date]
    max_ta: int
    max_students: int
    ta: List[UserSchema]
    students: List[UserSchema]


class ShiftSchemaCreate(Schema):
    start_time: time
    end_time: time
    day_of_week: str
    date: Optional[date]
    max_ta: int
    max_students: int


class SwapRequestSchema(Schema):
    id: uuid.UUID
    from_shift: ShiftSchema
    to_shift: ShiftSchema
    from_user: UserSchema
    to_user: UserSchema
    date_requested: datetime


class Error(Schema):
    message: str


def require_auth(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        print(request.user.is_authenticated)
        if not request.user.is_authenticated:
            raise HttpError(401, "Unauthorized")
        return func(request, *args, **kwargs)
    return wrapper

# SCHOOLS-----------------------------------------------------------------------


@sched_api.get("/schools", response=List[SchoolSchema])
def list_schools(request):
    schools = School.objects.all()
    return schools


@sched_api.get("/schools_paginated", response=List[SchoolSchema])
def list_schools_paginated(request, page: int = 1, page_size: int = 10):
    schools = School.objects.all()
    start = (page - 1) * page_size
    end = start + page_size
    if end < len(schools):
        return schools[start:end]
    else:
        return None

# QUESTIONS-----------------------------------------------------------------------


@sched_api.get("/questions", response={200: List[QuestionSchema], 403: Error})
@require_auth
def list_questions(request, subject_name):
    questions = Question.objects.filter(subject__name=subject_name)
    return 200, questions


@sched_api.post("/question", response={200: QuestionSchema, 403: Error})
@require_auth
def create_question(request, question: QuestionCreateSchema, subject_name: str):
    user = request.user
    if user.groups.filter(name="Student").exists():
        try:
            subject = Subject.objects.get(name=subject_name)
            if not subject:
                return 403, {"message": "Subject not found."}
            question_obj = Question.objects.create(
                question_text=question.question_text,
                asker=user,
                subject=subject,
                is_answered=False,
            )
            return 200, question_obj
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to create a question."}


@sched_api.put("/comment/{question_id}", response={200: QuestionSchema, 403: Error})
@require_auth
def comment_question(request, question_id: uuid.UUID, content: str):
    try:
        question = Question.objects.get(id=question_id)
        if not question:
            return 403, {"message": "Question not found."}
        comments = question.comments.all()
        new_comment = Comment.objects.create(
            question=question,
            user=request.user,
            content=content,
        )
        comments.append(new_comment)
        question.comments = comments
        question.save()
        return 200, question
    except Exception as e:
        return 403, {"message": str(e)}


@sched_api.put("/answer_question/{question_id}", response={200: QuestionSchema, 403: Error})
@require_auth
def answer_question(request, question_id: uuid.UUID):
    user = request.user
    if user.groups.filter(name__in=["Educator", "TA"]).exists():
        try:
            question = Question.objects.get(id=question_id)
            if not question:
                return 403, {"message": "Question not found."}
            question.is_answered = True
            question.save()
            return 200, question
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to answer a question."}
# SUBJECTS-----------------------------------------------------------------------


@sched_api.post("/subject", response={200: SubjectSchema, 403: Error})
@require_auth
def create_subject(request, subject: SubjectCreateSchema):
    user = request.user
    print(user.groups.all())
    if user.groups.filter(name="Educator").exists():
        try:
            subject_obj, _ = Subject.objects.get_or_create(
                name=subject.name,
            )
            return 200, subject_obj
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to create a subject."}


# SCHEDULES-----------------------------------------------------------------------


@sched_api.post("/schedule", response={200: ScheduleSchema, 403: Error})
@require_auth
def create_schedule(request, schedule: ScheduleSchemaCreate, subject_name: str):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            subject, _ = Subject.objects.get_or_create(name=subject_name)
            # if not subject:
            #     return 403, {"message": "Subject not found."}

            if schedule.is_ta_hours == True:
                prev_schedule = Schedule.objects.filter(
                    subject__name=subject_name).first()
            else:
                prev_schedule = Schedule.objects.filter(
                    subject__name=subject_name, educator__id=user.id).first()

            if prev_schedule:
                return 403, {"message": "Schedule already exists for the given subject and educator."}

            if schedule.is_ta_hours == True:
                schedule_obj = Schedule.objects.create(
                    subject=subject,
                    is_ta_hours=schedule.is_ta_hours,
                )
            else:
                schedule_obj = Schedule.objects.create(
                    subject=subject,
                    educator=user,
                    is_ta_hours=schedule.is_ta_hours,
                )
            return 200, schedule_obj
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to create a schedule."}

# SHIFTS-----------------------------------------------------------------------


@sched_api.get("/ta_shifts", response={200: List[ShiftSchema], 403: Error})
@require_auth
def list_ta_shifts(request, subject_name):
    shifts = Shift.objects.filter(subject__name=subject_name)
    if shifts != None:
        return 200, shifts
    return 403, {"message": "You are not authorized to view this resource."}


@sched_api.post("/ta_shift", response={200: ShiftSchema, 403: Error})
@require_auth
def create_ta_shift(request, shift: ShiftSchemaCreate, subject_name: str):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            subject = Subject.objects.get(name=subject_name)
            if not subject:
                return 403, {"message": "Subject not found."}

            schedule = Schedule.objects.filter(
                subject__name=subject_name, educator__id=user.id).first()
            if schedule == None:
                return 403, {"message": "Schedule not found for the given subject and educator."}

            days_of_week = ["Monday", "Tuesday", "Wednesday",
                            "Thursday", "Friday", "Saturday", "Sunday"]
            if shift.day_of_week not in days_of_week:
                return 403, {"message": "Invalid day of the week."}

            shifts = schedule.shifts.all()
            for existing_shift in shifts:
                e_start_time = existing_shift.start_time
                e_end_time = existing_shift.end_time
                e_day_of_week = existing_shift.day_of_week

                new_start_time = shift.start_time
                new_end_time = shift.end_time
                new_day_of_week = shift.day_of_week
                if e_day_of_week == new_day_of_week:
                    if (e_start_time <= new_start_time < e_end_time) or (e_start_time < new_end_time <= e_end_time):
                        return 403, {"message": "Shift time conflicts with existing shift."}

            shift_obj = Shift.objects.create(
                schedule=schedule,
                start_time=shift.start_time,
                end_time=shift.end_time,
                day_of_week=shift.day_of_week,
                date=shift.date,
                max_ta=shift.max_ta,
                max_students=shift.max_students,
            )

            schedule.shifts.add(shift_obj)
            schedule.save()
            return 200, shift_obj
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to create a shift."}


@sched_api.post("/create_swap_request", response={200: SwapRequestSchema, 403: Error})
@require_auth
def create_swap_request(request, from_shift_id: uuid.UUID, to_shift_id: uuid.UUID, to_user_id: uuid.UUID):
    from_user = request.user
    if from_user.groups.filter(name="TA").exists():
        try:
            from_shift = Shift.objects.get(id=from_shift_id)
            to_shift = Shift.objects.get(id=to_shift_id)
            to_user = User.objects.get(id=to_user_id)

            if not from_shift or not to_shift or not to_user:
                return 403, {"message": "Shift or user not found."}

            swap_request = SwapRequest.objects.create(
                from_shift=from_shift,
                to_shift=to_shift,
                from_user=from_user,
                to_user=to_user,
            )
            return 200, swap_request
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to create a swap request."}
