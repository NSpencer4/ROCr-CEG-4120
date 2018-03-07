
from datetime import datetime
from django.conf.urls import url
import django.contrib.auth.views

import Media.forms
import Media.views

# Uncomment the next lines to enable the admin:
# from django.conf.urls import include
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    # Examples:
    url(r'^$', Media.views.home, name='home'),
    url(r'^contact$', Media.views.contact, name='contact'),
    url(r'^task1$', Media.views.task1, name='task1'),
    url(r'^task2$', Media.views.task2, name='task2'),
    url(r'^task3$', Media.views.task3, name='task3'),
    url(r'^about', Media.views.about, name='about'),
    url(r'^login/$',
        django.contrib.auth.views.login,
        {
            'template_name': 'app/login.html',
            'authentication_form': Media.forms.BootstrapAuthenticationForm,
            'extra_context':
            {
                'title': 'Log in',
                'year': datetime.now().year,
            }
        },
        name='login'),
    url(r'^logout$',
        django.contrib.auth.views.logout,
        {
            'next_page': '/',
        },
        name='logout'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
]
