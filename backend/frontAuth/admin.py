from django.contrib import admin
from .models import SiteUser, Token


admin.site.register(SiteUser)
admin.site.register(Token)