from rest_framework import serializers
from feed.models import Post, Comment, Like


class ReplySerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)
    liked_by = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "user", "content", "liked_by"]

    def get_liked_by(self, obj):
        return list(
            Like.objects.filter(comment=obj)
            .values_list("user__username", flat=True)
        )


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)
    replies = ReplySerializer(many=True, read_only=True)
    liked_by = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "user", "content", "liked_by", "replies"]

    def get_liked_by(self, obj):
        return list(
            Like.objects.filter(comment=obj)
            .values_list("user__username", flat=True)
        )


class PostSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="author.username", read_only=True)
    comments = serializers.SerializerMethodField()
    liked_by = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "content", "user", "liked_by", "comments", "created_at"]

    def get_comments(self, obj):
        # ONLY top-level comments
        qs = obj.comments.filter(parent__isnull=True)
        return CommentSerializer(qs, many=True).data

    def get_liked_by(self, obj):
        return list(
            Like.objects.filter(post=obj)
            .values_list("user__username", flat=True)
        )
