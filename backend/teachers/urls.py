from django.urls import path
from .views import *

urlpatterns = [
    path('present/<str:name>', presentPlayer.as_view()),
    path('players/<str:name>/', presentPlayers.as_view()),
    path('default/', defaultCall.as_view()),
    path('myclassrooms/', Classrooms.as_view()),
    path('classroom/<str:name>/', Classroom.as_view())
]
