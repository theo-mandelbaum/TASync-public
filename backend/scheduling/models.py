from django.db import models
from django.db.models import CharField
from django.contrib.auth.models import AbstractUser
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

# Create your models here.


class School(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class User(AbstractUser):
    name = CharField(_("Name of User"), blank=True, max_length=255)
    school = models.ForeignKey(
        School, on_delete=models.SET_NULL, null=True, blank=True)
    first_name = None
    last_name = None

    def get_absolute_url(self) -> str:
        return reverse("users:detail", kwargs={"username": self.username})
