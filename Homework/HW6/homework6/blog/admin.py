from django.contrib import admin

from .models import Post

# Make post model available to admin
admin.site.register(Post)
