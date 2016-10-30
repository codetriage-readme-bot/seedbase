from django.conf.urls import include, url
from django.contrib import admin
import home

urlpatterns = [
    url(r'^$', include('home.urls')),
    url(r'^admin/', include(admin.site.urls)),
]