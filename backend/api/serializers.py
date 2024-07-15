from django.contrib.auth.models import User
from rest_framework import serializers

# serializer will take python object and convert it to json to be used in communication with the frontend
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True}
        }

    def create(self, validated_data):
        """
        Create and return a new `User` instance, given the validated data.
        """
        user = User.objects.create_user(**validated_data)
        return user