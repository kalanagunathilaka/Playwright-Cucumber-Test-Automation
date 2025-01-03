import { Given, When, Then } from "@cucumber/cucumber";
import { Wishlist } from "../../pages/wishlist";

const wishlist = new Wishlist();

Given('User is not logged in', async function () {
    console.log('\nCheck if the user is not logged in');
    await wishlist.verifyUserIsNotLoggedIn();
});

Then('Wishlist icon should not be visible', async function () {
    console.log('\nCheck if the Wishlist icon is not visible');
    await wishlist.verifyWishlistIconNotVisible();
});

Given('User is logged in', async function () {
    console.log('\nCheck if the user is logged in');
    await wishlist.verifyUserIsLoggedIn();
});

When('User adds a book to the wishlist', async function () {
    console.log('\nUser adds a book to the wishlist');
    await wishlist.addBookToWishlist();});

Then('Book should be added to the wishlist', async function () {
    console.log('\nBook should be added to the wishlist');
    await wishlist.verifyBookAddedToWishlist();
});

When('User removes the book from the wishlist', async function () {
    console.log('\nUser removes the book from the wishlist');
    this.wishListCountBefore = await wishlist.removeBookFromWishlist();
});

Then('Book should be removed from the wishlist', async function () {
    console.log('\nBook should be removed from the wishlist');
    await wishlist.verifyBookRemovedFromWishlist(this.wishListCountBefore);
});

When('User clears the wishlist', async function () {
    console.log('\nUser clears the wishlist');
    await wishlist.clearWishlist();
});

Then('Wishlist should be empty', async function () {
    console.log('\nCheck if the wishlist is empty');
    await wishlist.verifyWishlistIsEmpty();
});

When('User adds the book to the cart from the wishlist', async function () {
    console.log('\nUser adds the book to the cart from the wishlist');
    await wishlist.addBookToCartFromWishlist();
});

Then('Book should be added to the cart', async function () {
    console.log('\nCheck if the book is added to the cart');
    await wishlist.verifyBookAddedToCart();
});