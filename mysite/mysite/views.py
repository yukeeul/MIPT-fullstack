# importing HttResponse from library
from django.http import HttpResponse, JsonResponse

def home(request):
    # request is handled using HttpResponse object
    print("I am working")
    print(str(request))
    print(request.headers)
    try:
        print(request.GET['var1'])
        print(request.GET['var2'])
        print(request.GET['var3'])
    except:
        pass
    return HttpResponse("random text")
    #return HttpResponse("Any kind of HTML Here")