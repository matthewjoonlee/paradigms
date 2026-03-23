from django.urls import path

from . import views

app_name = 'blog'

#Connects URLs to the correct views.
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:id>/', views.detail, name='detail'),
]
