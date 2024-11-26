from django.db import models

class UserSettings(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    up_key = models.CharField(max_length=10, default="ArrowUp")
    down_key = models.CharField(max_length=10, default="ArrowDown")

    def __str__(self):
        return f"Settings for {self.user.username}"
    
# si la class de model s'appelle alo, le nom de ce model pour la base de donnée sera pongApp_alo;
class Participant(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
