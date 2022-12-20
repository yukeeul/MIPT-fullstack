from django.db import models

# Create your models here.
class Flight(models.Model):
    city_from = models.CharField(max_length=100)
    city_to = models.CharField(max_length=100)
    departure_date = models.DateTimeField()
    arrival_date = models.DateTimeField()
    price = models.IntegerField()

    def __str__(self):
        return self.city_from + self.city_to + str(self.departure_date)

