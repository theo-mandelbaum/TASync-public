from functools import wraps
from ninja import NinjaAPI, Schema, Router
import uuid
from datetime import date, time, datetime
from django.contrib.auth.models import Group
from backend.scheduling.models import Subject, School, User, Question, Schedule, Shift, Comment, SwapRequest
from typing import List, Optional
from ninja.errors import HttpError
from django.http import JsonResponse
import logging


logger = logging.getLogger(__name__)

sched_api = NinjaAPI(urls_namespace="sched_api",
                     title="Sched API", version="1.0")


class GroupSchema(Schema):
    id: int
    name: str


class SchoolSchema(Schema):
    id: uuid.UUID
    name: str


class SubjectSchema(Schema):
    id: uuid.UUID
    name: str
    is_ta_hours: bool


class SubjectCreateSchema(Schema):
    name: str


class UserSchema(Schema):
    id: uuid.UUID
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


class CommentCreateSchema(Schema):
    content: str


class QuestionCreateSchema(Schema):
    question_text: str


class ScheduleSchema(Schema):
    id: uuid.UUID
    educator: Optional[UserSchema]
    subject: SubjectSchema


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
    requester_shift: ShiftSchema
    requested_shift: ShiftSchema
    requester_user: UserSchema
    requested_user: UserSchema
    date_requested: datetime


class ListUsersSchema(Schema):
    ids: List[uuid.UUID]


class Success(Schema):
    message: str


class Error(Schema):
    message: str


def get_openapi_schema_view(request):
    openapi_schema = sched_api.get_openapi_schema()
    return JsonResponse(openapi_schema)


def require_auth(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        # Debugging
        print(f"User authenticated: {request.user.is_authenticated}")
        if not request.user.is_authenticated:
            raise HttpError(401, "Unauthorized")
        return func(request, *args, **kwargs)
    return wrapper

# GROUPS------------------------------------------------------------------------


@sched_api.get("/groups", response=List[GroupSchema])
def list_groups(request):
    groups = Group.objects.all()
    return groups

# USERS------------------------------------------------------------------------


@sched_api.get("/get_id", response={200: uuid.UUID})
@require_auth
def get_user_id(request):
    user = request.user
    return 200, user.id


@sched_api.put("/add_group/{group_id}", response={200: UserSchema, 403: Error})
@require_auth
def add_group(request, group_id: int):
    user = request.user
    if not user.groups.exists():
        group = Group.objects.get(id=group_id)
        if group:
            user.groups.add(group)
            user.save()
            return 200, user
        else:
            return 403, {"message": "Group not found."}
    else:
        return 403, {"message": "User already belongs to a group."}


@sched_api.get("/user_group", response={200: GroupSchema, 403: Error})
@require_auth
def get_user_group(request):
    user = request.user
    if user.groups.exists():
        group = user.groups.first()
        return group
    else:
        return 403, {"message": "User does not belong to any group."}


@sched_api.get("/get_students", response={200: List[UserSchema]})
@require_auth
def list_students(request):
    students = User.objects.filter(groups__name="Student")
    return 200, students


@sched_api.get("/get_tas", response={200: List[UserSchema]})
@require_auth
def list_tas(request):
    tas = User.objects.filter(groups__name="TA")
    return 200, tas


@sched_api.get("/get_educators", response={200: List[UserSchema]})
@require_auth
def list_educators(request):
    educators = User.objects.filter(groups__name="Educator")
    return 200, educators
# SCHOOLS------------------------------------------------------------------------


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


@sched_api.get("/questions/{subject_id}", response={200: List[QuestionSchema], 403: Error})
@require_auth
def list_questions(request, subject_id: uuid.UUID):
    questions = Question.objects.filter(subject__id=subject_id)
    return 200, questions


@sched_api.post("/question/{subject_id}", response={200: QuestionSchema, 403: Error})
@require_auth
def create_question(request, question: QuestionCreateSchema, subject_id: uuid.UUID):
    user = request.user
    if user.groups.filter(name="Student").exists():
        try:
            subject = Subject.objects.get(id=subject_id)
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


@sched_api.get("/comments/{question_id}", response={200: List[CommentSchema], 403: Error})
@require_auth
def list_comments(request, question_id: uuid.UUID):
    try:
        question = Question.objects.get(id=question_id)
        if not question:
            return 403, {"message": "Question not found."}
        comments = question.comments.all()
        return 200, comments
    except Exception as e:
        return 403, {"message": str(e)}


@sched_api.put("/comment/{question_id}", response={200: CommentSchema, 403: Error})
@require_auth
def comment_question(request, question_id: uuid.UUID, comment: CommentCreateSchema):
    try:
        question = Question.objects.get(id=question_id)
        if not question:
            return 403, {"message": "Question not found."}
        new_comment = Comment.objects.create(
            question=question,
            user=request.user,
            content=comment.content,
        )
        question.comments.add(new_comment)
        question.save()
        return 200, new_comment
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


@sched_api.put("/unanswer_question/{question_id}", response={200: QuestionSchema, 403: Error})
@require_auth
def unanswer_question(request, question_id: uuid.UUID):
    user = request.user
    if user.groups.filter(name__in=["Educator", "TA"]).exists():
        try:
            question = Question.objects.get(id=question_id)
            if not question:
                return 403, {"message": "Question not found."}
            question.is_answered = False
            question.save()
            return 200, question
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to unanswer a question."}
# SUBJECTS-----------------------------------------------------------------------


@sched_api.get("/subjects", response={200: List[SubjectSchema], 403: Error})
@require_auth
def list_subjects(request):
    subjects = Subject.objects.all()
    logger.error("\n\n\n\n\n\n\n\n\n\n\n\n\n")
    logger.error(subjects)
    return 200, subjects


@sched_api.get("/subjects/{subject_id}", response={200: SubjectSchema, 403: Error})
@require_auth
def get_subject(request, subject_id: uuid.UUID):
    try:
        subject = Subject.objects.get(id=subject_id)
        if not subject:
            return 403, {"message": "Subject not found."}
        return 200, subject
    except Exception as e:
        return 403, {"message": str(e)}


@sched_api.post("/subject/{is_ta_hours}", response={200: SubjectSchema, 403: Error})
@require_auth
def create_subject(request, subject: SubjectCreateSchema, is_ta_hours: bool):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            if is_ta_hours == True:
                ta_check = Subject.objects.filter(
                    name=subject.name, is_ta_hours=True).first()
                if ta_check:
                    return 403, {"message": "TA hours subject already exists."}
                else:
                    ta_hours = Subject.objects.create(
                        name=subject.name,
                        is_ta_hours=True,
                    )
                    ta_schedule = Schedule.objects.create(
                        subject=ta_hours,
                    )
                    ta_schedule.save()
                    return 200, ta_hours

            subject_obj, _ = Subject.objects.get_or_create(
                name=subject.name,
            )
            return 200, subject_obj
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to create a subject."}


@sched_api.put("/update_subject/{subject_id}", response={200: SubjectSchema, 403: Error})
@require_auth
def update_subject(request, subject_id: uuid.UUID, updated: SubjectCreateSchema):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            subject = Subject.objects.get(id=subject_id)
            subject.name = updated.name
            subject.save()
            return 200, subject
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to update a subject."}


@sched_api.delete("/delete_subject/{subject_id}", response={200: Success, 403: Error})
@require_auth
def delete_subject(request, subject_id: uuid.UUID):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            print("trying to delete")
            subject = Subject.objects.get(id=subject_id)
            subject.delete()
            return 200, {"message": "Subject deleted successfully."}
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to delete a subject."}


# SCHEDULES-----------------------------------------------------------------------

@sched_api.get("/schedules/{subject_id}", response={200: List[ScheduleSchema], 403: Error})
@require_auth
def list_schedules(request, subject_id: uuid.UUID):
    try:
        schedules = Schedule.objects.filter(subject__id=subject_id)
        if schedules:
            return 200, schedules
    except Exception as e:
        return 403, {"message": str(e)}


@sched_api.get("/educator_schedules", response={200: List[ScheduleSchema], 403: Error})
@require_auth
def list_educator_schedules(request):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            schedules = Schedule.objects.filter(educator__id=user.id)
            return 200, schedules
        except Exception as e:
            return 403, {"message": str(e)}
    else:
        return 403, {"message": "You are not authorized to view this resource."}


@sched_api.get("/ta_hour_schedule", response={200: ScheduleSchema, 403: Error})
@require_auth
def list_ta_hour_schedule(request):
    try:
        ta_hour_subject = Subject.objects.filter(is_ta_hours=True).first()
        if ta_hour_subject:
            schedule = Schedule.objects.filter(
                subject__id=ta_hour_subject.id).first()
            return 200, schedule
        else:
            return 403, {"message": "No TA hours subject found."}
    except Exception as e:
        return 403, {"message": str(e)}


@sched_api.post("/schedule/{subject_id}", response={200: ScheduleSchema, 403: Error})
@require_auth
def create_schedule(request, subject_id: uuid.UUID):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            subject = Subject.objects.get(id=subject_id)
            if not subject:
                return 403, {"message": "Subject not found."}

            if subject.is_ta_hours == True:
                prev_schedule = Schedule.objects.filter(
                    subject__id=subject_id).first()
            else:
                prev_schedule = Schedule.objects.filter(
                    subject__id=subject_id, educator__id=user.id).first()

            if prev_schedule:
                return 403, {"message": "Schedule already exists for the given subject and educator."}

            if subject.is_ta_hours == True:
                schedule_obj = Schedule.objects.create(
                    subject=subject,
                )
            else:
                schedule_obj = Schedule.objects.create(
                    subject=subject,
                    educator=user,
                )
            return 200, schedule_obj
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to create a schedule."}


@sched_api.delete("/delete_schedule/{schedule_id}", response={200: Success, 403: Error})
@require_auth
def delete_schedule(request, schedule_id: uuid.UUID):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            schedule = Schedule.objects.get(id=schedule_id)
            if not schedule:
                return 403, {"message": "Schedule not found."}
            if schedule.educator != user:
                return 403, {"message": "You are not authorized to delete this schedule."}
            schedule.delete()
            return 200, {"message": "Schedule deleted successfully."}
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to delete a schedule."}

# SHIFTS-----------------------------------------------------------------------


@sched_api.get("/ta_shifts/{subject_id}", response={200: List[ShiftSchema], 403: Error})
@require_auth
def list_ta_shifts(request, subject_id: uuid.UUID):
    logger.info("\n\n\n\n\n\n\n\n\n\n")
    logger.info(f"Fetching shifts for subject_id: {subject_id}")
    shifts = Shift.objects.filter(schedule__subject__id=subject_id)
    return 200, shifts


@sched_api.get("/schedule_ta_shifts/{schedule_id}", response={200: List[ShiftSchema], 403: Error})
@require_auth
def list_schedule_ta_shifts(request, schedule_id: uuid.UUID):
    shifts = Shift.objects.filter(schedule__id=schedule_id)
    return 200, shifts


@sched_api.get("/ta_hour_shift", response={200: List[ShiftSchema], 403: Error})
@require_auth
def list_ta_hour_shift(request):
    ta_hour_subjects = Subject.objects.filter(is_ta_hours=True).first()
    if ta_hour_subjects:
        shifts = Shift.objects.filter(subject__id=ta_hour_subjects.id)
        if shifts != None:
            return 200, shifts
    return 403, {"message": "You are not authorized to view this resource."}


@sched_api.post("/ta_shift/{schedule_id}", response={200: ShiftSchema, 403: Error})
@require_auth
def create_ta_shift(request, shift: ShiftSchemaCreate, schedule_id: uuid.UUID):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            schedule = Schedule.objects.get(id=schedule_id)
            if schedule == None:
                return 403, {"message": "Schedule not found for the given subject and educator."}

            days_of_week = ["Monday", "Tuesday", "Wednesday",
                            "Thursday", "Friday", "Saturday", "Sunday"]
            if shift.day_of_week not in days_of_week:
                return 403, {"message": "Invalid day of the week."}

            shifts = Shift.objects.filter(schedule__educator__id=user.id)
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


@sched_api.get("/shift_tas/{shift_id}", response={200: List[UserSchema], 403: Error})
@require_auth
def list_shift_tas(request, shift_id: uuid.UUID):
    try:
        shift = Shift.objects.get(id=shift_id)
        if not shift:
            return 403, {"message": "Shift not found."}
        tas = shift.ta.all()
        return 200, tas
    except Exception as e:
        return 403, {"message": str(e)}


@sched_api.get("/tas_not_in_shift/{shift_id}", response={200: List[UserSchema], 403: Error})
@require_auth
def list_tas_not_in_shift(request, shift_id: uuid.UUID):
    try:
        shift = Shift.objects.get(id=shift_id)
        if not shift:
            return 403, {"message": "Shift not found."}
        users = User.objects.filter(
            groups__name="TA").exclude(ta_shift__id=shift_id)
        print("INNER")
        print(users)
        return 200, users
    except Exception as e:
        return 403, {"message": str(e)}


@sched_api.get("/students_not_in_shift/{shift_id}", response={200: List[UserSchema], 403: Error})
@require_auth
def list_students_not_in_shift(request, shift_id: uuid.UUID):
    try:
        shift = Shift.objects.get(id=shift_id)
        if not shift:
            return 403, {"message": "Shift not found."}
        users = User.objects.filter(groups__name="Student").exclude(
            student_shift__id=shift_id)
        return 200, users
    except Exception as e:
        return 403, {"message": str(e)}


@sched_api.get("/shift_students/{shift_id}", response={200: List[UserSchema], 403: Error})
@require_auth
def list_shift_students(request, shift_id: uuid.UUID):
    try:
        shift = Shift.objects.get(id=shift_id)
        if not shift:
            return 403, {"message": "Shift not found."}
        students = shift.students.all()
        return 200, students
    except Exception as e:
        return 403, {"message": str(e)}


@sched_api.get("/all_shifts", response={200: List[ShiftSchema], 403: Error})
@require_auth
def list_all_shifts(request):
    try:
        shifts = Shift.objects.all()
        print(f"Shifts in database: {shifts}")  # Debugging
        for shift in shifts:
            print(shift.id, shift.start_time, shift.end_time)  # Debugging
        return 200, shifts
    except Exception as e:
        print(f"Error fetching shifts: {e}")
        return 403, {"message": str(e)}


@sched_api.put("/add_ta_to_shift/{shift_id}", response={200: ShiftSchema, 403: Error})
@require_auth
def add_ta_to_shift(request, shift_id: uuid.UUID):
    user = request.user
    if user.groups.filter(name="TA").exists():
        try:
            shift = Shift.objects.get(id=shift_id)
            if not shift:
                return 403, {"message": "Shift not found."}
            if shift.ta.count() < shift.max_ta:
                shift.ta.add(user)
                shift.save()
                return 200, shift
            else:
                return 403, {"message": "Max TA limit reached for this shift."}
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to add a TA to this shift."}


@sched_api.put("/remove_ta_from_shift/{shift_id}", response={200: ShiftSchema, 403: Error})
@require_auth
def remove_ta_from_shift(request, shift_id: uuid.UUID):
    user = request.user
    if user.groups.filter(name="TA").exists():
        try:
            shift = Shift.objects.get(id=shift_id)
            if not shift:
                return 403, {"message": "Shift not found."}
            if shift.ta.filter(id=user.id).exists():
                shift.ta.remove(user)
                shift.save()
                return 200, shift
            else:
                return 403, {"message": "You are not assigned to this shift."}
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to remove a TA from this shift."}


@sched_api.put("/add_student_to_shift/{shift_id}", response={200: ShiftSchema, 403: Error})
@require_auth
def add_student_to_shift(request, shift_id: uuid.UUID):
    user = request.user
    if user.groups.filter(name="Student").exists():
        try:
            shift = Shift.objects.get(id=shift_id)
            if not shift:
                return 403, {"message": "Shift not found."}
            if shift.students.count() < shift.max_students:
                shift.students.add(user)
                shift.save()
                return 200, shift
            else:
                return 403, {"message": "Max student limit reached for this shift."}
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to add a student to this shift."}


@sched_api.put("/remove_student_from_shift/{shift_id}", response={200: ShiftSchema, 403: Error})
@require_auth
def remove_student_from_shift(request, shift_id: uuid.UUID):
    user = request.user
    if user.groups.filter(name="Student").exists():
        try:
            shift = Shift.objects.get(id=shift_id)
            if not shift:
                return 403, {"message": "Shift not found."}
            if shift.students.filter(id=user.id).exists():
                shift.students.remove(user)
                shift.save()
                return 200, shift
            else:
                return 403, {"message": "You are not assigned to this shift."}
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to remove a student from this shift."}


@sched_api.put("/ed_add_student_to_shift/{shift_id}", response={200: ShiftSchema, 403: Error})
@require_auth
def ed_add_student_to_shift(request, shift_id: uuid.UUID, student_ids: ListUsersSchema):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            shift = Shift.objects.get(id=shift_id)
            if not shift:
                return 403, {"message": "Shift not found."}
            if shift.students.count() + len(student_ids.ids) > shift.max_students:
                return 403, {"message": "Max student limit reached for this shift."}
            for student_id in student_ids.ids:
                student = User.objects.get(id=student_id)
                if not student:
                    return 403, {"message": "Student not found."}
                if not student.groups.filter(name="Student").exists():
                    return 403, {"message": "User is not a student."}
                if shift.students.filter(id=student.id).exists():
                    return 403, {"message": "Student already assigned to this shift."}
            for student_id in student_ids.ids:
                student = User.objects.get(id=student_id)
                shift.students.add(student)
                shift.save()
            return 200, shift
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to add a student to this shift."}


@sched_api.put("/ed_remove_student_from_shift/{shift_id}", response={200: ShiftSchema, 403: Error})
@require_auth
def ed_remove_student_from_shift(request, shift_id: uuid.UUID, student_ids: ListUsersSchema):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            shift = Shift.objects.get(id=shift_id)
            if not shift:
                return 403, {"message": "Shift not found."}
            for student_id in student_ids.ids:
                student = User.objects.get(id=student_id)
                if not student:
                    return 403, {"message": "Student not found."}
                if not student.groups.filter(name="Student").exists():
                    return 403, {"message": "User is not a student."}
                if not shift.students.filter(id=student.id).exists():
                    return 403, {"message": "Student is not assigned to this shift."}
            for student_id in student_ids.ids:
                student = User.objects.get(id=student_id)
                shift.students.remove(student)
                shift.save()
                return 200, shift
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to remove a student from this shift."}


@sched_api.put("/ed_add_ta_to_shift/{shift_id}", response={200: ShiftSchema, 403: Error})
@require_auth
def ed_add_ta_to_shift(request, shift_id: uuid.UUID, ta_ids: ListUsersSchema):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            shift = Shift.objects.get(id=shift_id)
            if not shift:
                return 403, {"message": "Shift not found."}
            if shift.ta.count() + len(ta_ids.ids) > shift.max_ta:
                return 403, {"message": "Max TA limit reached for this shift."}
            for ta_id in ta_ids.ids:
                ta = User.objects.get(id=ta_id)
                if not ta:
                    return 403, {"message": "TA not found."}
                if not ta.groups.filter(name="TA").exists():
                    return 403, {"message": "User is not a TA."}
                if shift.ta.filter(id=ta.id).exists():
                    return 403, {"message": "TA already assigned to this shift."}
            for ta_id in ta_ids.ids:
                ta = User.objects.get(id=ta_id)
                shift.ta.add(ta)
                shift.save()
            return 200, shift
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to add a TA to this shift."}


@sched_api.put("/ed_remove_ta_from_shift/{shift_id}", response={200: ShiftSchema, 403: Error})
@require_auth
def ed_remove_ta_from_shift(request, shift_id: uuid.UUID, ta_ids: ListUsersSchema):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            shift = Shift.objects.get(id=shift_id)
            if not shift:
                return 403, {"message": "Shift not found."}
            for ta_id in ta_ids.ids:
                ta = User.objects.get(id=ta_id)
                if not ta:
                    return 403, {"message": "TA not found."}
                if not ta.groups.filter(name="TA").exists():
                    return 403, {"message": "User is not a TA."}
                if not shift.ta.filter(id=ta.id).exists():
                    return 403, {"message": "TA is not assigned to this shift."}
            for ta_id in ta_ids.ids:
                ta = User.objects.get(id=ta_id)
                shift.ta.remove(ta)
                shift.save()
                return 200, shift
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to remove a TA from this shift."}


@sched_api.delete("/delete_shift/{shift_id}", response={200: Success, 403: Error})
@require_auth
def delete_shift(request, shift_id: uuid.UUID):
    user = request.user
    if user.groups.filter(name="Educator").exists():
        try:
            shift = Shift.objects.get(id=shift_id)
            if not shift:
                return 403, {"message": "Shift not found."}
            shift.delete()
            return 200, {"message": "Shift deleted successfully."}
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to delete a shift."}


@sched_api.get("/ta_user_shifts", response={200: List[ShiftSchema], 403: Error})
@require_auth
def list_ta_user_shifts(request):
    user = request.user
    if user.groups.filter(name="TA").exists():
        try:
            shifts = Shift.objects.filter(ta__id=user.id)
            return 200, shifts
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to view this resource."}


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

            if not from_shift.ta.filter(id=from_user.id).exists():
                return 403, {"message": "You are not assigned to this shift."}

            if not to_shift.ta.filter(id=to_user.id).exists():
                return 403, {"message": "The user is not assigned to the target shift."}

            if to_shift.ta.filter(id=from_user.id).exists():
                return 403, {"message": "You are already assigned to the target shift."}

            if from_shift.ta.filter(id=to_user.id).exists():
                return 403, {"message": "The user is already assigned to the source shift."}

            swap_request = SwapRequest.objects.create(
                requester_shift=from_shift,
                requested_shift=to_shift,
                requester_user=from_user,
                requested_user=to_user,
            )
            return 200, swap_request
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to create a swap request."}


@sched_api.get("/incoming_swap_requests", response={200: List[SwapRequestSchema], 403: Error})
@require_auth
def list_incoming_swap_requests(request):
    user = request.user
    if user.groups.filter(name="TA").exists():
        try:
            swap_requests = SwapRequest.objects.filter(
                requested_user=user).prefetch_related('requester_shift', 'requested_shift')
            return 200, swap_requests
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to view this resource."}


@sched_api.get("/outgoing_swap_requests", response={200: List[SwapRequestSchema], 403: Error})
@require_auth
def list_outgoing_swap_requests(request):
    user = request.user
    if user.groups.filter(name="TA").exists():
        try:
            swap_requests = SwapRequest.objects.filter(
                requester_user=user).prefetch_related('requester_shift', 'requested_shift')
            return 200, swap_requests
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to view this resource."}


@sched_api.delete("/handle_swap_request/{swap_request_id}/{accepted}", response={200: Success, 403: Error})
@require_auth
def handle_swap_request(request, swap_request_id: uuid.UUID, accepted: bool):
    user = request.user
    if user.groups.filter(name="TA").exists():
        try:
            swap_request = SwapRequest.objects.get(id=swap_request_id)
            if not swap_request:
                return 403, {"message": "Swap request not found."}
            if swap_request.requested_user != user:
                return 403, {"message": "You are not authorized to handle this swap request."}

            if accepted:
                from_shift = swap_request.requester_shift
                to_shift = swap_request.requested_shift

                from_shift.ta.remove(swap_request.requester_user)
                to_shift.ta.remove(swap_request.requested_user)
                from_shift.ta.add(swap_request.requested_user)
                to_shift.ta.add(swap_request.requester_user)

                from_shift.save()
                to_shift.save()

            swap_request.delete()
            return 200, {"message": f"Swap was sucessfully {"accepted" if accepted else "rejected"}."}
        except Exception as e:
            return 403, {"message": str(e)}
    return 403, {"message": "You are not authorized to handle this swap request."}


@sched_api.get("/user_shifts/{user_id}", response={200: List[ShiftSchema], 403: Error})
@require_auth
def list_user_shifts(request, user_id: uuid.UUID):
    """
    Fetch all shifts for a specific user (TA or Educator).
    """
    try:
        user = User.objects.get(id=user_id)
        if not user:
            return 403, {"message": "User not found."}

        # Fetch shifts where the user is a TA or an educator
        ta_shifts = Shift.objects.filter(ta__id=user_id)
        educator_shifts = Shift.objects.filter(schedule__educator__id=user_id)

        # Combine and return the shifts
        shifts = ta_shifts | educator_shifts
        return 200, shifts
    except Exception as e:
        return 403, {"message": str(e)}
