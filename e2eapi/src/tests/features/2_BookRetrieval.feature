Feature: Book retrieval functionality

  As a user or admin
  I want to test book retrieval functionality
  So that I can validate the API's response for different scenarios

  # GET ALL BOOKS **************************************************************

  Scenario: Admin Retrieve all books
    Given There should be a book in the system
    Then Admin Send Retrieve all books request

  Scenario: User Retrieve all books
    Given There should be a book in the system
    Then User Send Retrieve all books request

  Scenario: Unauthorized User try to Retrieve all books
    Given There should be a book in the system
    Then Unauthorized User Send Retrieve all books request
    
  # GET BOOK BY ID **************************************************************

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
