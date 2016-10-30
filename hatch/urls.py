from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^/', include('landing_page.urls')),
    url(r'^admin/', admin.site.urls),
]
