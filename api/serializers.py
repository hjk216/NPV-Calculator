from rest_framework import serializers
from .models import User, Calculation
from django.contrib.auth import authenticate



# Model Serializers

# Calculation Serializer
class CalculationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Calculation
        fields = ('id', 'rate', 'NPV', 'data')



# User Serializers

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_username(self, username):
        if '@' not in username or '.' not in username:
            raise serializers.ValidationError('Must enter valid email.')
        return username

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
        '',
        validated_data['password'])

        return user



# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')



# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
