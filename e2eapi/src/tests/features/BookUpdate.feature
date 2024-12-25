Feature: Book update functionality

  As an admin  
  I want to update a book
  So that I can manage the books in the library

  Scenario: Admin successfully updates a book
    Given an admin has created a book
    When the admin updates the book details
    Then the book should be updated successfully
