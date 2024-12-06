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
from pongApp.models import DreamTeam, Account, History
from django.contrib.auth.hashers import make_password
from datetime import datetime, timedelta
import random

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
    augougea = Account.objects.get(pseudo="augougea")
    lulu = Account.objects.get(pseudo="lulu")
    lala = Account.objects.get(pseudo="lala")
    mdesrose = Account.objects.get(pseudo="mdesrose")
    lili = Account.objects.get(pseudo="lili")

    # Ajouter les amis à augougea
    augougea.friends.add(lulu, lala, mdesrose, lili)
    augougea.save()
    print("Les comptes Account ont été ajoutés à la base de données.")
else:
    print("Les comptes Account existent déjà dans la base de données.")

# Récupérer l'utilisateur augougea
player_one = Account.objects.get(pseudo="augougea")

# Récupérer les autres joueurs
other_players = Account.objects.exclude(pseudo="augougea")

# Générer 10 parties avec des adversaires et scores aléatoires
for i in range(10):
    player_two = random.choice(other_players)  # Choisir un joueur aléatoire parmi les autres
    player_one_score = random.randint(0, 10)  # Générer un score aléatoire pour le joueur 1
    player_two_score = random.randint(0, 10)  # Générer un score aléatoire pour le joueur 2
    game_date = datetime.now() - timedelta(days=random.randint(0, 30))  # Date aléatoire dans les 30 derniers jours
    
    # Créer une partie dans la table History
    History.objects.create(
        player_one_name=player_one.pseudo,
        player_two_name=player_two.pseudo,
        player_one_score=player_one_score,
        player_two_score=player_two_score,
        game_date=game_date
    )

print("**************************************")
print("CONTENU DE LA TABLE DreamTeam :")
for dreamer in DreamTeam.objects.all():
    print(f"Pseudo: {dreamer.pseudo}, Picture URL: {dreamer.picture_url}")

print("**************************************")
print("CONTENU DE LA TABLE Account :")
for account in Account.objects.all():
    print(f"Pseudo: {account.pseudo}, Victories: {account.victories}, Looses: {account.looses}")

print("**************************************")
print("CONTENU DE LA TABLE History :")
for game in History.objects.all():
    print(f"{game.player_one_name} ({game.player_one_score}) vs {game.player_two_name} ({game.player_two_score}) on {game.game_date}")
EOF
echo "**************************************"

#echo "python3 manage.py collectstatic --noinput"
#python3 manage.py collectstatic --noinput
#gunicorn pongProject.wsgi:application --bind 0.0.0.0:8000
python3 manage.py runserver 0.0.0.0:8000

