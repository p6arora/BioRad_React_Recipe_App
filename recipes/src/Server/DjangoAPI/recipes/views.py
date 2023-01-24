from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from recipes.models import recipes
from recipes.serializers import recipesSerializer

from recipes.models import users
from recipes.serializers import usersSerializer

from django.core.files.storage import default_storage

# Create your views here.
@csrf_exempt
def recipesApi(request, id=0):
    if request.method == 'GET':
        r = recipes.objects.all()
        r_serializer =  recipesSerializer(r, many=True)
        return JsonResponse(r_serializer.data, safe=False)
    elif request.method == "POST":
        r_data = JSONParser().parse(request)
        r_serializer = recipesSerializer(data=r_data)
        if r_serializer.is_valid():
            r_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == "PUT":
        r_data = JSONParser().parse(request)
        r = recipes.objects.get(RecipeId=r_data['RecipeId'])
        r_serializer = recipesSerializer(r, data=r_data)
        if r_serializer.is_valid():
            r_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == "DELETE":
        r = recipes.objects.get(RecipeId=id)
        r.delete()
        return JsonResponse("Deleted Successfully", safe=False)

@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)


@csrf_exempt
def loginApi(request, u="", p=""):
    if request.method == "GET":
        u = users.objects.filter(username=u)
        u_serializer = usersSerializer(u, many=True)
        return JsonResponse(u_serializer.data, safe=False)
    

