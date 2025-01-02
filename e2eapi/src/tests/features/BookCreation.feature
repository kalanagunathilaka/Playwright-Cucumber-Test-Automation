Feature: Book Creation

  Scenario: Admin Creates a valid book
    When Admin creates a valid book
    Then The book sould be created successfully

  Scenario: User Creates a valid book
    When User creates a valid book
    Then The book sould be created successfully

  Scenario: Unauthorized User Creates a valid book
    When Unauthorized User creates a valid book
    # Then The book sould not be created successfully


