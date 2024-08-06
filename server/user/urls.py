from django.urls import path
from user.views import loginView, registerView, CookieTokenRefreshView, logoutView, user, get_ethereum_balance

app_name = "user"

# Define the URL pattern for the API endpoint to get Ethereum balance
urlpatterns = [
    path('login', loginView),
    path('register', registerView),
    path('refresh-token', CookieTokenRefreshView.as_view()),
    path('logout', logoutView),
    path('user', user),
    # Map the 'api/balance/' URL to the get_ethereum_balance view
    path('api/balance/', get_ethereum_balance, name='api-balance')

]
