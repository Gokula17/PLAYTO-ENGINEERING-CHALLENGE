from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum
from feed.models import Post, KarmaEvent
from feed.serializers import PostSerializer

@api_view(["GET"])
def feed(request):
    posts = Post.objects.all().order_by("-created_at")
    return Response(PostSerializer(posts, many=True).data)

@api_view(["GET"])
def leaderboard(request):
    since = timezone.now() - timedelta(hours=24)
    data = (
        KarmaEvent.objects
        .filter(created_at__gte=since)
        .values("user__username")
        .annotate(score=Sum("value"))
        .order_by("-score")[:5]
    )
    return Response(data)
