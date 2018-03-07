from django.conf.urls import include, url
from django.contrib import admin
from django.conf.urls.static import static
#from django.conf.urls.media import media
from django.conf import settings
import Media.views

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('Media.urls', namespace="Media")),
    url('^', include('django.contrib.auth.urls')),
    url(r'^task1$', Media.views.task1, name='task1'),
    url(r'^task2$', Media.views.task2, name='task2'),
    url(r'^task3$', Media.views.task3, name='task3'),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
