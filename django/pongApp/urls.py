from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('welcome/', views.welcome, name='welcome'),
    path('board_player/', views.board_player, name='board_player'), 
    path('connection/', views.connection, name='connection'), 
    path('end_game/', views.end_game, name='end_game'),
    path('error404/', views.error404, name='error404'),
    path('game/', views.game, name='game'),
    path('IA/', views.settings_game_IA, name='IA'), 
    path('local/', views.settings_game_local, name='local'),
    path('register/', views.register, name='register'),
    path('settings_game/', views.settings_game, name='settings_game'),
    path('settings_player/', views.settings_player, name='settings_player'),
    path('2_players/', views.settings_game_2_players, name='2_players'),
    path('check_login/', views.check_login, name='check_login'),
    path('check_logout/', views.check_logout, name='check_logout'),
    path('check_register/', views.check_register, name='check_register'),
    path('online/', views.settings_game_online, name='online'),
    path('tournament/', views.settings_game_tournament, name='tournament'),
    path('save_color/', views.save_color, name='save_color'), 
]
