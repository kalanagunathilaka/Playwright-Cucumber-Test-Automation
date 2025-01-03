Feature: Wishlist functionality

  Scenario: Before logged in, Wishlist icon shouldn't be visible
    Given User is not logged in
    Then Wishlist icon should not be visible

  Scenario: After logged in, Add Book to Wishlist
    Given an user has logged in 
    When User adds a book to the wishlist
    Then Book should be added to the wishlist

  Scenario: After logged in, Remove Book from Wishlist
    Given an user has logged in 
    When User removes the book from the wishlist
    Then Book should be removed from the wishlist

  Scenario: After logged in, Clear Wishlist
    Given an user has logged in 
    When User clears the wishlist
    Then Wishlist should be empty

  Scenario: After logged in, Add to cart a Book from wishlist
    Given an user has logged in 
    Given User adds a book to the wishlist
    When User adds the book to the cart from the wishlist
    Then Book should be added to the cart
