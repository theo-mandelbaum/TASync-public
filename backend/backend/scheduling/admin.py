from django.contrib import admin
from .models import User, Question, Schedule, Subject, School, Shift
# Register your models here.

admin.site.register(User)
admin.site.register(Question)
admin.site.register(Schedule)
admin.site.register(Subject)
admin.site.register(School)
admin.site.register(Shift)
