# Generated by Django 4.1.5 on 2023-01-24 09:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=500)),
                ('password', models.CharField(max_length=500)),
            ],
        ),
        migrations.AlterModelOptions(
            name='recipes',
            options={},
        ),
    ]
