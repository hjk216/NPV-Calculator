from rest_framework import viewsets, permissions, generics
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Calculation
from .serializers import CalculationSerializer, RegisterSerializer, LoginSerializer, UserSerializer



# Model APIs

# Calculation Viewset
class CalculationViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

    serializer_class = CalculationSerializer

    def get_queryset(self):
        return Calculation.objects.filter(user=self.request.user).all().order_by('-id')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



# User APIs

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })



# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })



# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
