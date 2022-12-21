from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.apps import apps

def flights_view(request):
    return HttpResponse("всем привет!")
