Feature: Checkout functionality

  As an Authenticated user
  I want to test checkout functionality
  So that I can validate the behavior for various scenarios on the checkout page
  
  @UI-TC-15
  Scenario: Fill details and place an order successfully
    Given an user has logged in 
    Given the user has items in the cart
    Given the user is on the checkout page
    When the user fills in all required fields
    When the user clicks the Place Order button
    Then an order confirmation page should be displayed with an order ID

  @UI-TC-16
  Scenario: Missing required fields during checkout
    Given an user has logged in 
    Given the user has items in the cart
    Given the user is on the checkout page
    When the user leaves required fields empty
    When the user clicks the Place Order button
    Then an error message should be displayed indicating the missing fields

  @UI-TC-17
  Scenario: Invalid input validation for Pincode field
    Given an user has logged in 
    Given the user has items in the cart
    Given the user is on the checkout page
    When the user enters an invalid Pincode
    When the user clicks the Place Order button
    Then an error message should be displayed

  @UI-TC-18
  Scenario: Cancel order on the checkout page
    Given an user has logged in 
    Given the user has items in the cart
    Given the user is on the checkout page
    When the user clicks the Cancel button
    Then the user should be redirected back to the cart

  @UI-TC-19
  Scenario: Viewing orders on the My orders page
    Given an user has logged in 
    Given the user has items in the cart
    Given the user has placed orders in the past
    When the user navigates to the My orders page
    Then a list of past orders with order id should be displayed
