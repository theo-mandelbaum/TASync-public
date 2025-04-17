from django.urls import path

from backend.sched_api import views


urlpatterns = [
    path("", views.sched_api.urls),
    path("schema/", views.get_openapi_schema_view, name="schema"),
]
