Feature: User Registration

  @UI-TC-25
  Scenario: User registration with valid data
    Given Navigate to the User Registration Page
    When User Submit the registration form with valid data
    Then User should redirected to the Login Page
    When User submit the login form with registered credentials   
    Then Registered user should be logged in successfully