from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.apps import apps
from django.views.decorators.csrf import csrf_exempt


import json


def generate_token(name):
    return name + "token"

@csrf_exempt 
def login(request):
    print(request)
    if request.method == 'POST':
        try:
            body = request.body.decode("utf-8")
            username = json.loads(body)['username']
            password = json.loads(body)['password']
        except:
            return HttpResponseBadRequest()
        model = apps.get_model('frontAuth', 'SiteUser')
        query_result = model.objects.raw('SELECT * FROM frontauth_siteuser WHERE name="{}" AND password="{}"'.format(username, password))
        if len(query_result) > 0:
            token = generate_token(username)
            model = apps.get_model('frontAuth', 'Token')
            model.objects.create(username=username, token=token)
            return JsonResponse({'token': token})  
        else:
            token = "INCORRECT"
        return JsonResponse({'token': token}) 
    else:
        return HttpResponseBadRequest()
