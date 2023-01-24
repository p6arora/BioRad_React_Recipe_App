from django.urls import re_path
from recipes import views

urlpatterns=[
    re_path(r'^recipes$', views.recipesApi),
    re_path(r'^recipes/([0-9]+)$', views.recipesApi),
    re_path(r'^login$', views.loginApi)
]

