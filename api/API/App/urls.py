from django.urls import include, re_path
from App import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    
    re_path(r'^account$',views.customerApi),

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)