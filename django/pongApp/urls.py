from django.urls import path
from . import views

urlpatterns = [
    path('', views.welcome, name='welcome'),
    path('board_player/', views.board_player, name='board_player'), 
    path('connection/', views.connection, name='connection'), 
    path('end_game/', views.recording, name='end_game'),
    path('error404/', views.error404, name='error404'),
    path('game/', views.game, name='game'),
    path('recording/', views.recording, name='recording'),
    path('settings_game/', views.settings_game, name='settings_game'),
    path('settings_game/local/2_players/', views.settings_game_2_players, name='2_players'),    
    path('settings_game/local/IA/', views.settings_game_IA, name='IA'), 
    path('settings_game/local/tournament/', views.test, name='tournament'), 
    path('settings_game_local/', views.settings_game_local, name='local'),
    path('game/', views.game, name='game'),
    path('settings_player/', views.settings_player, name='settings_player'),
    path('settings_game/local/tournament/2/', views.show_tournament_participants, name='show_tournament_participants'),
    path('save-settings/', views.save_user_settings, name='save_settings'),
]
