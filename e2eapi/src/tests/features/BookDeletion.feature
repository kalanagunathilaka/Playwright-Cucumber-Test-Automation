Feature: Book Deletion

  As an admin
  I want to delete a book
  So that it is no longer available in the catalog

  Scenario: Successfully delete a book
    Given an admin has created a book
    When the admin deletes the same book
    Then the book should be deleted successfully
    
    
