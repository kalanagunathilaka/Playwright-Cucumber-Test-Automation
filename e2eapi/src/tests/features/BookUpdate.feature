Feature: Book update functionality

  As an admin  or user
  I want to update a book
  So that I can manage the books in the library

Scenario: Admin successfully updates a book
    Given an Admin has created a book
    When the admin updates the book details
    Then the book should be updated successfully

Scenario: User fails to update a book
    Given an Admin has created a book
    When the user updates the book details

    Then the book should not be updated

Scenario: unauthenticated user fails to update a book
    Given an Admin has created a book
    When the unauthenticated user updates the book details
    Then the book should not be updated

Scenario: Admin attempts to update a book with an invalid ID
    When the admin updates the book with an invalid ID
    Then the admin should see a 404 Not Found error

Scenario: User attempts to update a book with an invalid ID
    When the user updates the book with an invalid ID
    Then the user should see a 401 Unauthorized error

# Anudhi's    

Scenario: Admin attempts to update a book with missing ID
    When the admin sends the update request with missing ID
    Then the admin should see a 405 Method Not Allowed error

Scenario: Admin attempts to update a book with missing title
    When the admin sends the update request with missing title
    Then the admin should see a 400 Bad Request error

Scenario: Admin attempts to update a book with missing author
    When the admin sends the update request with missing author
    Then the admin should see a 400 Bad Request error

Scenario: User attempts to update a book with missing ID
    When the user sends the update request with missing ID
    Then the user should see a 405 Method Not Allowed error

Scenario: User attempts to update a book with missing title
    When the user sends the update request with missing title
    Then the user should see a 403 Forbidden error

Scenario: User attempts to update a book with missing author
    When the user sends the update request with missing author
    Then the user should see a 403 Forbidden error