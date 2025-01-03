Feature: Cart functionality

 As a Authenticated and Unauthenticated user
 I want to test cart functionality
 So that I can validate the behavior for different roles and scenarios
@UI-TC-06
Scenario: Authenticated user successfully adds a book to cart via Home page
    Given an user has logged in 
    When the user adds the book to cart via Home page
    Then the same book should be added to cart successfully

@UI-TC-07
Scenario: UnAuthenticated user successfully adds a book to cart via Home page
    Given an user has not logged in
    When the user adds the book to cart via Home page
    Then the same book should be added to cart successfully

@UI-TC-08
Scenario: Authenticated user successfully removes a book from cart
    Given an user has logged in 
    Given the user adds the book to cart via Home page
    When the user removes the same book from cart
    Then the same book should be removed from cart successfully

@UI-TC-09
Scenario: Authenticated user successfully increase the quantity of a book in cart
    Given an user has logged in 
    Given the user adds the book to cart via Home page
    When the user increase the quantity of the book in cart
    Then the quantity of the book should be increased successfully

@UI-TC-10
Scenario: Authenticated user clears the cart
    Given an user has logged in 
    Given the user adds the book to cart via Home page
    When the user clears the cart
    Then the cart should be cleared successfully

@UI-TC-11
Scenario: Authenticated user checks out the cart
    Given an user has logged in 
    Given the user adds the book to cart via Home page
    When the user checks out the cart
    Then the cart should be redirected to the checkout page 

#-------------------------------------------------------
@UI-TC-12
Scenario: Authenticated user successfully decrease the quantity of a book in cart
    Given an user has logged in 
    Given the user adds the book to cart via Home page  
    When the user decrease the quantity of the book in cart
    Then the quantity of the book should be decrease successfully

@UI-TC-13
Scenario: Authenticated user successfully adds a book to cart via Item detail Page
    Given an user has logged in 
    When the user adds the book to cart via Item detail Page
    Then the same book should be added to cart successfully

@UI-TC-14
Scenario: UnAuthenticated user successfully adds a book to cart via Iten Detail page
    Given an user has not logged in
    When the user adds the book to cart via Item detail Page
    Then the same book should be added to cart successfully