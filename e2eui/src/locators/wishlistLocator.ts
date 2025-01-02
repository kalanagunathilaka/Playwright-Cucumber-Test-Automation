export class WishlistLocators {
    static readonly WISHLIST_ICON ='xpath=/html/body/app-root/app-nav-bar/mat-toolbar/mat-toolbar-row/div[3]/button[1]/span[3]';  // Locator for the wishlist icon
    static readonly ADD_TO_WISHLIST_BUTTON = 'xpath=/html/body/app-root/div/app-home/div/div[2]/div/div[1]/app-book-card/mat-card/mat-card-content/div[1]/app-addtowishlist/span '; // Locator for adding a book to the wishlist
    static readonly REMOVE_FROM_WISHLIST_BUTTON = 'xpath=/html/body/app-root/div/app-wishlist/mat-card/mat-card-content/table/tbody/tr/td[5]/app-addtowishlist/button/span[4]'; // Locator for adding to cart from the wishlist
    static readonly ADD_TO_CART_FROM_WISHLIST_BUTTON = 'xpath=/html/body/app-root/div/app-wishlist/mat-card/mat-card-content/table/tbody/tr/td[4]/app-addtocart/button/span[4] '; // Locator for removing a book from the wishlist'; 
}