from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.apps import apps

def flights_view(request):
    print(request)
    try:
        city_from = request.GET['var1']
        city_to = request.GET['var2']
        date = request.GET['var3']
    except:
        return HttpResponse("incorrect request")
    
    model = apps.get_model('flights', 'Flight')
    
    ans = []
    for flight in model.objects.raw('SELECT * FROM flights_flight WHERE city_from="{}" AND city_to="{}" AND Date(departure_date)="{}"'.format(city_from, city_to, date)):
        ans.append({"city_from" : flight.city_from, "city_to" : flight.city_to, "price" : flight.price, "departure_date" : flight.departure_date, "arrival_date" : flight.arrival_date})
        
    response = JsonResponse({'ans': ans})
    response["Access-Control-Allow-Origin"] = "*"
    response['Content-Type'] = "application/json; charset=utf-8"
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type, My-Token"
    return response
