from django.db import models

# Create your models here.

class recipes(models.Model):
    RecipeId = models.AutoField(primary_key=True)
    Name = models.CharField(max_length=500)
    Ingredients = models.CharField(max_length=500)
    Instructions = models.CharField(max_length=500)
    serving_size = models.CharField(max_length=500)
    category = models.CharField(max_length=500)
    notes = models.CharField(max_length=500)
    dateAdded = models.DateField()
    dateModified = models.DateField()

class users(models.Model):
    username = models.CharField(max_length=500)
    password = models.CharField(max_length=500)