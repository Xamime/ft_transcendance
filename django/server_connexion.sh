#!/bin/sh

sleep 5
echo "**************************************"
echo "MIGRATIONS"
python3 manage.py makemigrations
python3 manage.py migrate
echo "**************************************"

#echo "python3 manage.py collectstatic --noinput"
#python3 manage.py collectstatic --noinput
#gunicorn pongProject.wsgi:application --bind 0.0.0.0:8000
python3 manage.py runserver 0.0.0.0:8000
