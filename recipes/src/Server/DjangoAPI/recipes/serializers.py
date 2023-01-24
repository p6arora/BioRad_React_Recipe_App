from rest_framework import serializers
from recipes.models import recipes
from recipes.models import users

class recipesSerializer(serializers.ModelSerializer):
    class Meta:
        model=recipes 
        fields=('RecipeId','Name', 'Ingredients', 'Instructions', 'serving_size', 'category', 'notes', 'dateAdded', 'dateModified')

class usersSerializer(serializers.ModelSerializer):
    class Meta:
        model=users
        fields=('username', 'password')