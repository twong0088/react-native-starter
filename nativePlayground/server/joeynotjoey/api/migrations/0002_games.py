# Generated by Django 3.1.4 on 2021-01-03 07:45

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Games',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default=api.models.generate_unique_code, max_length=8, unique=True)),
                ('playerOne', models.CharField(max_length=20)),
                ('playerTwo', models.CharField(max_length=20)),
            ],
        ),
    ]