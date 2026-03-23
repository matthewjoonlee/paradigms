from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404, render

from .models import Post


def index(request):
    posts = Post.objects.order_by('-pub_date')
    page_obj = Paginator(posts, 5).get_page(request.GET.get('page'))
    return render(request, 'blog/index.html', {'page_obj': page_obj})


def detail(request, id):
    post = get_object_or_404(Post, pk=id)
    return render(request, 'blog/detail.html', {'post': post})
