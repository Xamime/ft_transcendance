from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Participant, UserSettings
from django.http import HttpResponse,HttpResponseRedirect, JsonResponse
from .forms import TournamentForm
from django import forms
from . import models

def save_user_settings(request):
    if request.method == 'POST':
        up_key = request.POST.get('up_key', 'ArrowUp')  # Valeur par défaut
        down_key = request.POST.get('down_key', 'ArrowDown')

        # Créez une réponse pour sauvegarder les cookies
        response = JsonResponse({'message': 'Settings saved successfully!'})
        response.set_cookie('up_key', up_key)
        response.set_cookie('down_key', down_key)

        return response
    return JsonResponse({'error': 'Invalid request'}, status=400)

def test(request):
    return render(request, "main/settings_game_tournament.html")

def show_tournament_participants(request):
    # Récupérer les participants pour un tournoi donné
    participants = Participant.objects.filter()
    
    # Passer les participants au template
    return render(request, 'main/show_participants.html', {'participants': participants})#, 'tournament_id': tournament_id})


def welcome(request):
    return render(request, 'main/welcome.html')

def board_player(request):
    return render(request, 'main/board_player.html')

def connection(request):
    return render(request, 'main/connection.html')

def end_game(request):
    return render(request, 'main/end_game.html')

def error404(request):
    return render(request, 'main/error404.html')

def recording(request):
    return render(request, 'main/recording.html')
    
def settings_game(request):
    return render(request, 'main/settings_game.html')
    
def settings_game_2_players(request):
    return render(request, 'main/settings_game_2_players.html')
    
def settings_game_IA(request):
    return render(request, 'main/settings_game_IA.html')

def settings_game_local(request):
    return render(request, 'main/settings_game_local.html')

def game(request):
    return render(request, 'main/game.html')

def settings_tournament(request):
    return render(request, 'main/settings_game_tournament.html')

def settings_player(request):
    return render(request, 'main/settings_player.html')

