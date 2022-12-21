from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.apps import apps
from django.views.decorators.csrf import csrf_exempt

import json


def home(request):
    print(request)
    if request.method == 'GET':
        try:
            city_from = request.GET['var1']
            city_to = request.GET['var2']
            date = request.GET['var3']
            print(city_from, city_to, date)
            print(city_from == 'Piter')
        except:
            return HttpResponse("incorrect request")
        
        model = apps.get_model('flights', 'Flight')
        
        ans = []
        for flight in model.objects.raw('SELECT * FROM flights_flight WHERE city_from="{}" AND city_to="{}" AND Date(departure_date)="{}"'.format(city_from, city_to, date)):
            ans.append({"city_from" : flight.city_from, "city_to" : flight.city_to, "price" : flight.price, "departure_date" : flight.departure_date, "arrival_date" : flight.arrival_date})
            
        return JsonResponse({'ans': ans})
    else:
        return HttpResponseBadRequest()

def generate_token(name):
    return name + "token"

@csrf_exempt 
def login(request):
    print(request)
    if request.method == 'POST':
        body = request.body.decode("utf-8")
        username = json.loads(body)['username']
        password = json.loads(body)['password']
        model = apps.get_model('frontAuth', 'SiteUser')
        query_result = model.objects.raw('SELECT * FROM frontauth_siteuser WHERE name="{}" AND password="{}"'.format(username, password))
        if len([i for i in query_result]) > 0:
            token = generate_token(username)
            model = apps.get_model('frontAuth', 'Token')
            model.objects.create(username=username, token=token)
            return JsonResponse({'token': token})  
        else:
            token = "INCORRECT"
        return JsonResponse({'token': token}) 
    else:
        return HttpResponseBadRequest()
