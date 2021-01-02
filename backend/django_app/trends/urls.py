from django.urls import path
from . import views

urlpatterns = [
    path('trends/', views.showTrends.as_view(), name='api_trends')
]
