from django.shortcuts import render
from .models import Account, DreamTeam, History
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.db.models import Q

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
    friends = user.friends.all()  
    history = History.objects.filter(Q(player_one_name=user.pseudo) | Q(player_two_name=user.pseudo))
    return render(request, 'main/partial/board_player.html', {'user': user, 'friends' : friends, 'history': history})

def connection(request):
    accounts = Account.objects.all()
    return render(request, 'main/partial/connection.html', {'accounts': accounts})

def end_game(request):
    return render(request, 'main/partial/end_game.html')

def error404(request):
    return render(request, 'main/partial/error404.html')

def game(request):
    user = request.user
    if request.method == 'POST':
        History.objects.create(
            player_one_name=user.pseudo,
            player_two_name=request.POST.get('player_two'),
            player_one_score=request.POST.get('player_one_score'),
            player_two_score=request.POST.get('player_two_score')
        )
        return JsonResponse({'status': 'success', 'message': 'Game history recorded!'})
    return render(request, 'main/partial/game.html')

# def game(request):
#     return render(request, 'main/partial/game.html')

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

@login_required
def save_color(request):
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                try:
                    data = json.loads(request.body)
                except json.JSONDecodeError as e:
                    return JsonResponse({'success': False, 'error': f'Invalid JSON: {str(e)}'})
            else:
                data = request.POST

            bar_color = data.get('bar-color')

            if bar_color:
                user = request.user
                user.bar_color = bar_color
                user.save()
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'error': 'Color not provided'})

        except Exception as e:
            return JsonResponse({'success': False, 'error': 'An error occurred while saving the color'})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})