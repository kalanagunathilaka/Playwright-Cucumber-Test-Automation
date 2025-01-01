Feature: Retrieve all books

  Scenario: Admin Retrieve all books
    Given There should be a book in the system
    Then Admin Send Retrieve all books request

  Scenario: User Retrieve all books
    Given There should be a book in the system
    Then User Send Retrieve all books request

  Scenario: Unauthorized User try to Retrieve all books
    Given There should be a book in the system
    Then Unauthorized User Send Retrieve all books request
