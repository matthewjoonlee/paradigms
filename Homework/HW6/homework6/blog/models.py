from django.db import models


#Blog post model with title, content, author name, and publication date
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author_name = models.CharField(max_length=100)
    pub_date = models.DateTimeField()

    def __str__(self):
        return self.title
