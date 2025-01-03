Feature: Book Creation

  Scenario: Admin Creates a valid book
    When Admin creates a valid book
    # Then response status code should be 201
    Then The book sould be created successfully

  Scenario: User Creates a valid book
    When User creates a valid book
    # Then response status code should be 201
    Then The book sould be created successfully

  Scenario: Unauthorized User Creates a valid book
    When Unauthorized User creates a valid book
    # Then response status code should be 401
    # Then The book sould not be created successfully

  Scenario: Admin Creates the same book again
    When Admin creates the same book again
    # Then response status code should be 208
    # Then The book sould not be created successfully

  Scenario: Admin Creates a book without mandatory fields
    When Admin creates a book without mandatory fields
    # Then The book sould not be created successfully with status code 400

  Scenario: Admin Creates a book with mandatory fields as null
    When Admin creates a book with mandatory fields as null
    # Then The book sould not be created successfully with status code 400

  Scenario: Admin Creates a book with mandatory fields as empty
    When Admin creates a book with mandatory fields as empty
    # Then The book sould not be created successfully with status code 400

  Scenario: Admin Creates a book without title
    When Admin creates a book without title
    # Then The book sould not be created successfully with status code 400

  Scenario: Admin Creates a book with title as null
    When Admin creates a book with title as null
    # Then The book sould not be created successfully with status code 400

  Scenario: Admin Creates a book with title as empty
    When Admin creates a book with title as empty
    # Then The book sould not be created successfully with status code 400

