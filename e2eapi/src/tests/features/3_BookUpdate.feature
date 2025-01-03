@update
Feature: Book update functionality

  As an admin  or user
  I want to update a book
  So that I can manage the books in the library

    @API-TC-20
    @prasadi
    Scenario: Admin successfully updates a book
        Given an Admin has created a book
        When the admin updates the book details
        Then the book should be updated successfully

    @API-TC-21
    @prasadi
    Scenario: User fails to update a book
        Given an Admin has created a book
        When the user updates the book details
        Then the book should not be updated

    @API-TC-22
    @prasadi
    Scenario: unauthenticated user fails to update a book
        Given an Admin has created a book
        When the unauthenticated user updates the book details
        Then the book should not be updated

    @API-TC-23
    @prasadi
    Scenario: Admin attempts to update a book with an invalid ID
        When the admin updates the book with an invalid ID
        Then the admin should see a 404 Not Found error

    @API-TC-24
    @prasadi
    Scenario: User attempts to update a book with an invalid ID
        When the user updates the book with an invalid ID
        Then the user should see a 401 Unauthorized error   

    @API-TC-25
    @anudhi
    Scenario: Admin attempts to update a book with missing ID
        Given an Admin has created a book
        When the admin sends the update request with missing ID
        Then the admin should see a 405 Method Not Allowed error

    @API-TC-26
    @anudhi
    Scenario: Admin attempts to update a book with missing title
        Given an Admin has created a book
        When the admin sends the update request with missing title
        Then the admin should see a 400 Bad Request error

    @API-TC-27
    @anudhi
    Scenario: Admin attempts to update a book with missing author
        Given an Admin has created a book
        When the admin sends the update request with missing author
        Then the admin should see a 400 Bad Request error

    @API-TC-28
    @anudhi
    Scenario: User attempts to update a book with missing ID
        Given an Admin has created a book
        When the user sends the update request with missing ID
        Then the user should see a 405 Method Not Allowed error

    @API-TC-29
    @anudhi
    Scenario: User attempts to update a book with missing title
        Given an Admin has created a book
        When the user sends the update request with missing title
        Then the user should see a 403 Forbidden error

    @API-TC-30
    @anudhi
    Scenario: User attempts to update a book with missing author
        Given an Admin has created a book
        When the user sends the update request with missing author
        Then the user should see a 403 Forbidden error