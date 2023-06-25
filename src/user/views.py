from django.contrib.auth.hashers import check_password
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework_jwt.views import JSONWebTokenAPIView

from .models import User
from .serializers import LoginSerializer, UserSerializer, RegistrationSerializer


class ObtainJSONWebToken(JSONWebTokenAPIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)


class CreateUserView(CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = (AllowAny,)


class ManageUserView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


# @api_view(['GET'])
# def user_list(request):
#     if request.method == 'GET':
#         users = User.objects.all().order_by('name')
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
