from django.urls import path
from feed.views import feed, leaderboard

urlpatterns = [
    path("api/feed/", feed),
    path("api/leaderboard/", leaderboard),
]
