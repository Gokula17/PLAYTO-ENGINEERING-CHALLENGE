from django.contrib import admin
from feed.models import Post, Comment, KarmaEvent

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "created_at")
    fields = ("author", "content")

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "post", "parent", "created_at")
    list_filter = ("post",)
    fields = ("user", "post", "parent", "content")


@admin.register(KarmaEvent)
class KarmaEventAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "value", "created_at")

from feed.models import Like

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "post", "comment", "created_at")
    list_filter = ("post", "comment")



