from django.db import models


class SiteUser(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)


class Token(models.Model):
    username = models.CharField(max_length=100)
    token = models.CharField(max_length=100)