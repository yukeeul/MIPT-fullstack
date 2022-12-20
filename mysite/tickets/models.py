from django.db import models
from django.contrib.auth.models import User

from flights.models import Flight


class Ticket(models.Model):
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
