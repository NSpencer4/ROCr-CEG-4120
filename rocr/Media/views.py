"""
Definition of views.
"""

from django.shortcuts import render
from django.http import HttpRequest
from django.template import RequestContext
from datetime import datetime

def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'Media/index.html',
        {
            'title':'Home Page',
            'year':datetime.now().year,
        }
    )

def task1(request):
    return render(request, 'Media/task1.html', 
                 {'title' : 'Task One'})

def task2(request):
    return render(request, 'Media/task2.html', 
                 {'title' : 'Task Two'})

def task3(request):
    return render(request, 'Media/task3.html', 
                 {'title' : 'Task Three'})

def contact(request):
    """Renders the contact page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'Media/contact.html',
        {
            'title':'Contact',
            'message':'Your contact page.',
            'year':datetime.now().year,
        }
    )

def about(request):
    """Renders the about page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'Media/about.html',
        {
            'title':'About',
            'message':'Your application description page.',
            'year':datetime.now().year,
        }
    )
