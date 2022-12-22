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
  
  
def get_name_by_token(token):
   model = apps.get_model('frontAuth', 'Token')
   query_result = model.objects.raw('SELECT * FROM frontauth_token WHERE token="{}"'.format(token))
   if len(query_result) > 0:
       return query_result[0].username
   else:
       return None
   
@csrf_exempt         
def buy_ticket(request):
    print(request)
    if request.method == 'POST':
        try:
            token = json.loads(request.body)['token']
            id = json.loads(request.body)['id']
        except:
            return HttpResponseBadRequest()
        name = get_name_by_token(token)
        if name == None:
            return JsonResponse({'status': 'INCORRECT'}) 
        
        flights = apps.get_model('flights', 'Flight')
        flight = flights.objects.get(id=int(id))
        tickets = apps.get_model('tickets', 'Ticket')
        tickets.objects.create(flight=flight, username=name)
        return JsonResponse({'status': 'COMPLETED'}) 
    else:
        return HttpResponseBadRequest()
        
        

