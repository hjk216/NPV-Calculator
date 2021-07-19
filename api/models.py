from django.db import models
from django.contrib.auth.models import User



class Calculation(models.Model):
    rate = models.CharField(max_length=255, default='')
    NPV = models.CharField(max_length=255, default='')
    data = models.JSONField(default=dict)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
