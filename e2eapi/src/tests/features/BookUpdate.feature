Feature: Book update functionality

  As an admin  or user
  I want to update a book
  So that I can manage the books in the library

# Scenario: Admin successfully updates a book
#     Given an Admin has created a book
#     When the admin updates the book details
#     Then the book should be updated successfully

Scenario: User fails to update a book
    Given an Admin has created a book
    When the user updates the book details
    Then the book should not be updated