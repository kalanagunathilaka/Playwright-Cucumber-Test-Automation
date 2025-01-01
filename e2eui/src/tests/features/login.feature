Feature: User login

  Scenario: User login with valid credentials
    Given Navigate to the login page
    When User submit the login form with valid credentials
    Then User should be logged in successfully

  Scenario: User login with invalid credentials
    Given Navigate to the login page
    When User submit the login form with invalid credentials
    Then User should see an error message
