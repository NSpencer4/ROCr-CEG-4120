"""
Definition of models.
"""

from django.db import models

# Create your models here.


class Roccurve(models.Model):
    function = models.CharField(max_length = 25)
    rule = models.CharField(max_length = 7)
    xValue = models.DecimalField(max_digits=3, decimal_places=2)
    yValue = models.DecimalField(max_digits=3, decimal_places=2)
