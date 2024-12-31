Feature: User login
  As a user
  I want to login
  So that I can access the application

  Scenario: User login with valid credentials
    Given I am on the login page
    When I enter valid credentials
    And I click on the login button
    Then I should be redirected to the home page

#   Scenario: User login with invalid credentials
#     Given I am on the login page
#     When I enter invalid credentials
#     And I click on the login button
#     Then I should see an error message