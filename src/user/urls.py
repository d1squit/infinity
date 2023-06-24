from django.urls import path
from rest_framework_jwt.views import refresh_jwt_token, verify_jwt_token
from .views import ObtainJSONWebToken

from .views import CreateUserView, ManageUserView

app_name = 'user'

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='create'),
    path('profile/', ManageUserView.as_view(), name='profile'),

    path('token/obtain/', ObtainJSONWebToken.as_view(), name='token'),
    path('token/refresh/', refresh_jwt_token, name='refresh'),
    path('token/verify/', verify_jwt_token, name='verify'),
]