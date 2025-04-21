from django.db import models
from django.db.models import CharField
from django.contrib.auth.models import AbstractUser
from django.urls import reverse
import uuid
from django.utils.translation import gettext_lazy as _

# Create your models here.


class Subject(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    is_ta_hours = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class School(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = CharField(_("Name of User"), blank=True, max_length=255)
    school = models.ForeignKey(
        School, on_delete=models.SET_NULL, null=True, blank=True, related_name="users")
    subjects = models.ManyToManyField(
        Subject, blank=True, related_name="users")
    first_name = None
    last_name = None

    def get_absolute_url(self) -> str:
        return reverse("users:detail", kwargs={"username": self.username})


class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(
        'Question', on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    date_posted = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.content}"


class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question_text = models.CharField(max_length=200)
    subject = models.ForeignKey(
        Subject, on_delete=models.CASCADE, related_name="questions")
    asker = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="questions_asked")
    date_asked = models.DateField(auto_now_add=True)
    is_answered = models.BooleanField(default=False)

    def __str__(self):
        return self.question_text


class Schedule(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    educator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="schedule", null=True, blank=True)
    subject = models.ForeignKey(
        Subject, on_delete=models.CASCADE, related_name="schedule", null=True, blank=True)

    def __str__(self):
        return f"Schedule for {self.educator.username if self.educator else ""}({self.subject.name})"


class Shift(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    schedule = models.ForeignKey(
        Schedule, on_delete=models.CASCADE, related_name="shifts")
    start_time = models.TimeField()
    end_time = models.TimeField()
    day_of_week = models.CharField(max_length=10)
    date = models.DateField(null=True, blank=True)
    max_ta = models.IntegerField()
    max_students = models.IntegerField()
    ta = models.ManyToManyField(
        User, blank=True, related_name="ta_shift")
    students = models.ManyToManyField(
        User, blank=True, related_name="student_shift")


class SwapRequest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    requester_shift = models.ForeignKey(
        Shift, on_delete=models.CASCADE, related_name="swap_requests")
    requested_shift = models.ForeignKey(
        Shift, on_delete=models.CASCADE, related_name="requested_swap_requests")
    requester_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="swap_users")
    requested_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="requested_swap_users")
    date_requested = models.DateField(auto_now_add=True)
