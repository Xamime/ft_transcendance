from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

class DreamTeam(models.Model):
    id = models.BigAutoField(primary_key=True)
    pseudo = models.CharField(max_length=100)
    picture_url = models.URLField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return (
            f"DreamTeam(id={self.id}, "
            f"pseudo='{self.pseudo}', "
            f"picture_url='{self.picture_url}')"
        )
        

class Account(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(primary_key=True)
    pseudo = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100) 
    avatar = models.URLField(max_length=255, blank=True, null=True) 
    victories = models.IntegerField(default=0) 
    looses = models.IntegerField(default=0) 
    status = models.CharField(max_length=50, choices=[('Online', 'Online'), ('Offline', 'Offline'), ('Busy', 'Busy')], default='Offline')
    friends = models.ManyToManyField('self', blank=True, related_name='friends_with', symmetrical=False)
    bar_color = models.CharField(max_length=7, default='#000000')  # Ajout d'un champ pour la couleur de la barre

    USERNAME_FIELD = 'pseudo'
    REQUIRED_FIELDS = ['password'] 

    def __str__(self):
        return (
            f"Account(id={self.id}, "
            f"pseudo='{self.pseudo}', "
            f"password='{self.password}', "
            f"avatar='{self.avatar}', "
            f"victories={self.victories}, "
            f"looses={self.looses})"
        )

class History(models.Model):
    id = models.AutoField(primary_key=True)             
    player_one_name = models.CharField(max_length=100)  
    player_two_name = models.CharField(max_length=100)  
    player_one_score = models.IntegerField()            
    player_two_score = models.IntegerField()            
    game_date = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"{self.player_one_name} vs {self.player_two_name} ({self.player_one_score}-{self.player_two_score}) on {self.game_date.strftime('%Y-%m-%d %H:%M:%S')}"
