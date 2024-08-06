from rest_framework import serializers
from django.conf import settings
from django.contrib.auth import get_user_model


# Define a serializer for user registration
class RegistrationSerializer(serializers.ModelSerializer):
    # Define an additional field for password confirmation
    password2 = serializers.CharField(style={"input_type": "password"})

    # Meta class to specify model and fields to be serialized
    class Meta:
        model = get_user_model()  # Use the user model
        fields = ("first_name", "last_name", "email", "password", "password2", "ethereum_wallet")  # Specify the fields to be included
        extra_kwargs = {
            "password": {"write_only": True},  # Set password field to write-only
            "password2": {"write_only": True}  # Set password2 field to write-only
        }

    # Define the save method to handle user creation
    def save(self):
        # Create a new user instance with validated data
        user = get_user_model()(
            email=self.validated_data["email"],
            first_name=self.validated_data["first_name"],
            last_name=self.validated_data["last_name"],
            ethereum_wallet=self.validated_data.get('ethereum_wallet', '')  # Get the ethereum_wallet if provided, else default to empty string
        )

        # Get passwords from validated data
        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]

        # Check if passwords match
        if password != password2:
            # Raise validation error if passwords do not match
            raise serializers.ValidationError({"password": "Passwords do not match!"})

        # Set the user's password
        user.set_password(password)
        # Save the user instance to the database
        user.save()

        # Return the created user instance
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "email", "is_staff", "first_name", "last_name")
