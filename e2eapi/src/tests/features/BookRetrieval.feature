Feature: Book retrieval functionality

  As a user or admin
  I want to test book retrieval functionality
  So that I can validate the API's response for different scenarios

  Scenario: Admin retrieves a book by a valid ID
    Given admin has created a book
    When the admin retrieves the book by its ID
    Then the book details should be returned successfully

  Scenario: Admin attempts to retrieve a book with an invalid ID
    When the admin retrieves the book with an invalid ID
    Then the admin should see a 404 Not Found error

  Scenario: User retrieves a book by a valid ID
    Given admin has created a book
    When the user retrieves the book by its ID
    Then the book details should be returned successfully

  Scenario: User attempts to retrieve a book with an invalid ID
    When the user retrieves the book with an invalid ID
    Then the user should see a 404 Not Found error

  Scenario: Unauthenticated user attempts to retrieve a book
    Given admin has created a book
    When an unauthenticated user retrieves the book by its ID
    Then the user should see a 401 Unauthorized error
