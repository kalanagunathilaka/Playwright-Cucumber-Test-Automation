Feature: View Book Details 

 As a Authenticated and Unauthenticated user
 I want to test Book details view functionality
 So that I can validate the behavior for different roles and scenarios.

 Scenario: Select two random books and check if their details are displayed
  Given the user has logged in
  When the user selects two random books from the Home page
  Then the details of both books should be displayed correctly

