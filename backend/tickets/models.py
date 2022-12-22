from django.db import models
from flights.models import Flight


class Ticket(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, default='')
