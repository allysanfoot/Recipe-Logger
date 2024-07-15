from django.urls import path
from . import views

urlpatterns = [
    path('recipes/', views.RecipeListCreateView.as_view(), name='recipe-list'),
    path('recipes/delete/<int:pk>/', views.DeleteRecipe.as_view(), name='delete-recipe'),
]