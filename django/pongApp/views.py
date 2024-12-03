from django.shortcuts import render
from .models import Account, DreamTeam
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required

import json
import logging

logger = logging.getLogger('django')

def index(request):
    profiles = DreamTeam.objects.all()
    return render(request, 'main/index.html', {'profiles': profiles})

def welcome(request):
    profiles = DreamTeam.objects.all()
    return render(request, 'main/partial/welcome.html', {'profiles': profiles})

@login_required
def board_player(request):
    user = request.user
    return render(request, 'main/partial/board_player.html', {'user': user})

def connection(request):
    accounts = Account.objects.all()
    return render(request, 'main/partial/connection.html', {'accounts': accounts})

def end_game(request):
    return render(request, 'main/partial/end_game.html')

def error404(request):
    return render(request, 'main/partial/error404.html')

def game(request):
    return render(request, 'main/partial/game.html')

def register(request):
    return render(request, 'main/partial/register.html')
    
def settings_game(request):
    return render(request, 'main/partial/settings_game.html')
    
def settings_game_IA(request):
    return render(request, 'main/partial/settings_game_IA.html')

def settings_game_local(request):
    return render(request, 'main/partial/settings_game_local.html')
    
def settings_game_2_players(request):
    return render(request, 'main/partial/settings_game_2_players.html')

def settings_player(request):
    return render(request, 'main/partial/settings_player.html')
    
def settings_game_online(request):
    return render(request, 'main/partial/settings_game_online.html')

def settings_game_tournament(request):
    return render(request, 'main/partial/settings_game_tournament.html')

@csrf_exempt
def check_login(request):
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                try:
                    data = json.loads(request.body)
                except json.JSONDecodeError as e:
                    return JsonResponse({'success': False, 'error': f'Invalid JSON: {str(e)}'})
            else:
                data = request.POST

            username = data.get('username')
            password = data.get('password')

            try:
                user = Account.objects.get(pseudo=username)
            except Account.DoesNotExist:
                return JsonResponse({'success': False, 'error': 'User not found'})

            if not check_password(password, user.password):
                return JsonResponse({'success': False, 'error': 'Invalid password'})

            login(request, user)
            return JsonResponse({'success': True})

        except Exception as e:
            return JsonResponse({'success': False, 'error': 'An error occurred during login'})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})

@csrf_exempt
def check_logout(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                logout(request)
                return JsonResponse({'success': True})
            except Exception as e:
                return JsonResponse({'success': False, 'error': str(e)})
        else:
            return JsonResponse({'success': False, 'error': 'User not logged in'})
    return JsonResponse({'success': False, 'error': 'Invalid request method'})
    

@csrf_exempt
def check_register(request):
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                try:
                    data = json.loads(request.body)
                except json.JSONDecodeError as e:
                    return JsonResponse({'success': False, 'error': f'Invalid JSON: {str(e)}'})
            else:
                data = request.POST

            username = data.get('username')
            password = data.get('password')

            if Account.objects.filter(pseudo=username).exists():
                return JsonResponse({'success': False, 'error': 'User already exists'})

            hashed_password = make_password(password)  
            user = Account.objects.create(pseudo=username, password=hashed_password)

            login(request, user)
            return JsonResponse({'success': True})

        except Exception as e:
            return JsonResponse({'success': False, 'error': 'An error occurred during registration'})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})
