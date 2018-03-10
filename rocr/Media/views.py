from django.shortcuts import render, redirect, get_object_or_404, HttpResponseRedirect
from django.core.urlresolvers import reverse
from .models import Upload
from django.http import Http404
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from Media import forms
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.utils import timezone
from datetime import datetime
from django.http import JsonResponse
import logging
import os

# Example output: C:\Users\Chase\Documents\projects\group-4110\rocr\Media
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def task1(request):
    return render(request, 'Media/task1.html', 
                 {'title' : 'Task One'})

def task2(request):
    return render(request, 'Media/task2.html', 
                 {'title' : 'Task Two'})

def task3(request):
    return render(request, 'Media/task3.html', 
                 {'title' : 'Task Three'})


def task4(request):
    return render(request, 'Media/task4.html', 
                 {'title' : 'Task Four'})



def index(request):

    context = {
        'recent': Upload.objects.all(),
        'loginForm': AuthenticationForm()
    }
    return render(request, 'Media/homepage.html', context)

def createUser(request):
    form = forms.RegistrationForm()

    if request.method == 'POST':
        form = forms.RegistrationForm(request.POST)

        if form.is_valid():
            newuser = form.save()
            messages.add_message(request, messages.SUCCESS, 'User created!')
            return redirect(reverse('Media:loginUser'))

    return render(request, 'registration/createUser.html', {'form': form})

def loginUser(request):
    if request.user.is_authenticated():
        return redirect('/')

    context = {}
    context['loginForm'] = AuthenticationForm()

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                messages.add_message(request, messages.INFO, 'Logged in!')

                # Go back to previous page if not at the login page
                if request.POST.get('next') == request.get_full_path():
                    return redirect('/')
                else:
                    return redirect(request.POST.get('next'))
            else:
                # user not active
                context['error'] = 'Your account is inactive'
        else:
            # bad login
            context['error'] = 'Your username or password are incorrect'

    return render(request,'registration/loginPage.html', context)

def logout_view(request):
    logout(request)
    return render(request, 'Media/homepage.html')
