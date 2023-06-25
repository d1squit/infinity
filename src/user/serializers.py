from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password

from rest_framework import serializers
from rest_framework_jwt.serializers import JSONWebTokenSerializer

from .models import User


class PasswordConfirmField(serializers.CharField):
    def to_internal_value(self, data):
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('email', 'name', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()

        return user


class RegistrationSerializer(UserSerializer):
    password_confirm = PasswordConfirmField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ('email', 'name', 'password', 'password_confirm')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

    def validate_password_confirm(self, value):
        password = self.get_initial().get('password')

        if password and value != password:
            raise serializers.ValidationError("Passwords do not match.")

        return value


class LoginSerializer(JSONWebTokenSerializer):
    @staticmethod
    def validate_name(value):
        user = User.objects.filter(name=value).first()

        if not user:
            raise serializers.ValidationError('Username is not registered')

        return value

    def validate_password(self, value):
        user = User.objects.filter(name=self.get_initial().get('name')).first()

        if user:
            if not check_password(value, user.password):
                raise serializers.ValidationError('Password is incorrect')

        return value


