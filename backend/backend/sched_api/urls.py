from django.urls import path

from backend.sched_api import views


urlpatterns = [
    path("", views.sched_api.urls),
]
