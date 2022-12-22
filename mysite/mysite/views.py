from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1> Всем привет! Это бэкенд. </h1>")
        
        

