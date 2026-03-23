from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404, render

from .models import Post


#Show blog posts 5 at a time on blog page
def index(request):
    posts = Post.objects.order_by('-pub_date')
    page_obj = Paginator(posts, 5).get_page(request.GET.get('page'))
    return render(request, 'blog/index.html', {'page_obj': page_obj})


#Show the full details for selected blog post
def detail(request, id):
    post = get_object_or_404(Post, pk=id)
    return render(request, 'blog/detail.html', {'post': post})
