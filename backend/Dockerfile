FROM python:3.12

WORKDIR /code/
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY manage.py .
COPY ./backend ./backend/
EXPOSE 8000
ENV EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
ENV EMAIL_HOST=smtp.mailgun.org
ENV EMAIL_PORT=587
ENV EMAIL_USE_TLS=True
ENV EMAIL_HOST_USER=postmaster@mail.jeromeslocallibrary.me
ENV EMAIL_HOST_PASSWORD=fbfc8be8c5750d17eebcbae9b97b425c-67bd41c2-ebfd6fd6
ENV DEFAULT_FROM_EMAIL=noreply@tsync.org

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
