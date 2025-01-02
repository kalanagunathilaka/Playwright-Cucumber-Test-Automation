Feature: Wishlist functionality after registration

  Scenario: Before Registration, Wishlist icon shouldn't be visible
    Given Wishlist icon should not be visible

  Scenario: After Registration, Add Book to Wishlist, Remove and Add to Cart
    Given User is registered and logged in
    When User adds a book to the wishlist
    Then Book should be added to the wishlist
    Given User removes the book from the wishlist
    When User adds the book to the cart from the wishlist
    Then New Book should be added to the cart
 
    

