from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.apps import apps

def home(request):
    return HttpResponse("Hello everyone!")
