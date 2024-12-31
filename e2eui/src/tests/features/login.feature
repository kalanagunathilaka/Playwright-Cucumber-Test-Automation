Feature: User login

  As a user
  I want to login
  So that I can access the application

  Scenario: User login with valid credentials
    Given Navigate to the login page
    When User submit the login form with valid credentials
    Then User should be logged in successfully