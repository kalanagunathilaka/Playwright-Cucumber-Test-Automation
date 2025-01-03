Feature: Checkout functionality

  As an Authenticated user
  I want to test checkout functionality
  So that I can validate the behavior for various scenarios on the checkout page

  Scenario: Fill details and place an order successfully
    Given the user is logged in and has items in the cart
    Given the user is on the checkout page
    When the user fills in all required fields
    When the user clicks the "Place Order" button
    Then an order confirmation page should be displayed with an order ID

  Scenario: Missing required fields during checkout
    Given the user is logged in and has items in the cart
    Given the user is on the checkout page
    When the user leaves required fields empty
    When the user clicks the "Place Order" button
    Then an error message should be displayed indicating the missing fields

  Scenario: Invalid input validation for Pincode field
    Given the user is logged in and has items in the cart
    Given the user is on the checkout page
    When the user enters an invalid Pincode
    When the user clicks the "Place Order" button
    Then an error message should be displayed

  Scenario: Cancel order on the checkout page
    Given the user is logged in and has items in the cart
    Given the user is on the checkout page
    When the user clicks the "Cancel" button
    Then the user should be redirected back to the cart

  Scenario: Viewing orders on the "My orders" page
    Given the user is logged in and has placed orders in the past
    When the user navigates to the "My orders" page
    Then a list of past orders with order id should be displayed

  Scenario: No orders placed
    Given the user is logged in and has not placed any orders
    When the user navigates to the "My Orders" page
    Then a message "You have no orders yet" should be displayed
