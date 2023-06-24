from django.contrib.auth.hashers import check_password
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework_jwt.views import JSONWebTokenAPIView

from .models import User
from .serializers import UserSerializer


class ObtainJSONWebToken(JSONWebTokenAPIView):
    serializer_class = JSONWebTokenSerializer

    def post(self, request, *args, **kwargs):
        user = User.objects.filter(name=request.data['name']).first()

        response = super().post(request, *args, **kwargs)

        if response.status_code == 400:
            if not user:
                if 'name' not in response.data:
                    response.data['name'] = []

                response.data['name'].append("There are no accounts registered to this username")
            elif not check_password(request.data['password'], user.password):
                if 'password' not in response.data:
                    response.data['password'] = []

                response.data['password'].append("Password is incorrect")

        return response


class CreateUserView(CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        print(request.data)
        return super().post(request, *args, **kwargs)


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
