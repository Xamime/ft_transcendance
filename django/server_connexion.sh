#!/bin/sh

sleep 5
echo "**************************************"
echo "MIGRATIONS"
python3 manage.py makemigrations pongApp
python3 manage.py migrate
echo "**************************************"

echo "**************************************"
echo "AJOUT DES PROFILS DANS LA BASE DE DONNÉES"
python3 manage.py shell <<EOF
from pongApp.models import DreamTeam, Account
from django.contrib.auth.hashers import make_password

# Ajout des profils dans DreamTeam
if DreamTeam.objects.count() == 0:
    DreamTeam.objects.create(pseudo="augougea", picture_url="")
    DreamTeam.objects.create(pseudo="mdesrose", picture_url="")
    DreamTeam.objects.create(pseudo="lili", picture_url="")
    DreamTeam.objects.create(pseudo="lulu", picture_url="")
    DreamTeam.objects.create(pseudo="lala", picture_url="")
    print("Les profils DreamTeam ont été ajoutés à la base de données.")
else:
    print("Les profils DreamTeam existent déjà dans la base de données.")

# Ajout des comptes dans Account
if Account.objects.count() == 0:
    Account.objects.create(pseudo="augougea", password=make_password("augougea"), avatar="", victories=0, looses=0)
    Account.objects.create(pseudo="mdesrose", password=make_password("mdesrose"), avatar="", victories=0, looses=0)
    Account.objects.create(pseudo="lili", password=make_password("lili"), avatar="", victories=0, looses=0)
    Account.objects.create(pseudo="lulu", password=make_password("lulu"), avatar="", victories=0, looses=0)
    Account.objects.create(pseudo="lala", password=make_password("lala"), avatar="", victories=0, looses=0)
    print("Les comptes Account ont été ajoutés à la base de données.")
else:
    print("Les comptes Account existent déjà dans la base de données.")

print("**************************************")
print("CONTENU DE LA TABLE DreamTeam :")
for dreamer in DreamTeam.objects.all():
    print(f"Pseudo: {dreamer.pseudo}, Picture URL: {dreamer.picture_url}")

print("**************************************")
print("CONTENU DE LA TABLE Account :")
for account in Account.objects.all():
    print(f"Pseudo: {account.pseudo}, Victories: {account.victories}, Looses: {account.looses}")
EOF
echo "**************************************"

#echo "python3 manage.py collectstatic --noinput"
#python3 manage.py collectstatic --noinput
#gunicorn pongProject.wsgi:application --bind 0.0.0.0:8000
python3 manage.py runserver 0.0.0.0:8000

