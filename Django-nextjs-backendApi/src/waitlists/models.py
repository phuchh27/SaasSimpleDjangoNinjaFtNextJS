from django.db import models
from django.conf import settings
User = settings.AUTH_USER_MODEL


class WailistEntry(models.Model):
    user = models.ForeignKey(
        User, default=None, null=True, blank=True, on_delete=models.SET_NULL)
    email = models.EmailField()
    update = models.DateTimeField(auto_now=True)
    timestamp = models.DateTimeField(auto_now_add=True)
