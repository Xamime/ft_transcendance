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
    is_active = models.BooleanField(default=True)

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

