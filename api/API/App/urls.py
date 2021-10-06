from django.conf.urls import url
from App import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    
    url(r'^account$',views.customerApi),

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)