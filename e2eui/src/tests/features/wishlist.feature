Feature: Wishlist Functionality

  Scenario: Verify wishlist icon is not visible before registering
    Given Navigate to the home page
    Then Verify the wishlist icon is not visible

  Scenario: Add a book to the wishlist after registering
    Given User is logged in
    When User clicks the wishlist icon of a book
    Then The book should be added to the wishlist

  Scenario: Remove a book from the wishlist
    Given A book is already in the wishlist
    When User removes the book from the wishlist
    Then The book should no longer be in the wishlist

  Scenario: Add a book to the cart from the wishlist
    Given A book is already in the wishlist
    When User adds the book to the cart from the wishlist
    Then The book should be added to the cart
