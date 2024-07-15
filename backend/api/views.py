from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, RecipeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Recipe

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class RecipeListCreateView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

    def get_queryset(self):
        """
        Return a list of all the recipes for the currently authenticated user.
        """
        return Recipe.objects.filter(author=self.request.user)
    
class DeleteRecipe(generics.DestroyAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Return a list of all the recipes for the currently authenticated user.
        """
        return Recipe.objects.filter(author=self.request.user)