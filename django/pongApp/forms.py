from django import forms
from django.forms import ModelForm
from .models import Participant

class TournamentForm(ModelForm):
    
    class Meta:
        model = Participant
        fields = ('name',)