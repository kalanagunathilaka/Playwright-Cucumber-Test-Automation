export class WishlistLocators {
    static readonly WISHLIST_ICON ='xpath=/html/body/app-root/app-nav-bar/mat-toolbar/mat-toolbar-row/div[3]/button[1]/span[3]';  // Locator for the wishlist icon
    static readonly WISHLIST_COUNT = '#mat-badge-content-2'; // Locator for the wishlist count
    static readonly ADD_TO_WISHLIST_BUTTON = 'xpath=/html/body/app-root/div/app-home/div/div[2]/div/div[1]/app-book-card/mat-card/mat-card-content/div[1]/app-addtowishlist/span '; // Locator for adding a book to the wishlist
    static readonly ADDED_BOOK_IMAGE = 'img[src="/Upload/9d8f4978-0ef8-42d0-873a-4eb583439237HP2.jpg"]'; // Locator for the selected image
    static readonly ADDED_BOOK_TITLE = 'a[href="/books/details/2"]:has-text("Harry Potter and the Chamber of Secrets")'; // Locator for the selected book title
    static readonly ADDED_BOOK_ROW = 'tr:has(img[src="/Upload/9d8f4978-0ef8-42d0-873a-4eb583439237HP2.jpg"])' + ':has(a[href="/books/details/2"]:has-text("Harry Potter and the Chamber of Secrets"))';
    static readonly REMOVE_FROM_WISHLIST_BUTTON = 'app-addtowishlist button'; // Locator for adding to cart from the wishlist
    static readonly CLEAR_WISHLIST_BUTTON = 'button.mat-mdc-raised-button:has-text("Clear Wishlist")'; // Locator for clearing the wishlist
    static readonly ADD_TO_CART_FROM_WISHLIST_BUTTON = 'app-addtocart button'; // Locator for removing a book from the wishlist'; 
}