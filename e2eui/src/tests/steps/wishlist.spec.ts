import { Given, When, Then } from "@cucumber/cucumber";
import { Wishlist } from "../../pages/wishlist";

const wishlist = new Wishlist();

Given('Navigate to the homepage', async function () {
    console.log('\nNavigate to the homepage');
    // Navigate to homepage code here
});

When('Check if the Wishlist icon is not visible', async function () {
    console.log('\nCheck if the Wishlist icon is not visible');
    await wishlist.verifyWishlistIconNotVisible();
});

Given('User is registered and logged in', async function () {
    console.log('\nUser is registered and logged in');
    // Login function goes here
});

When('User adds a book to the wishlist', async function () {
    console.log('\nUser adds a book to the wishlist');
    await wishlist.manageWishlist();
});

Then('Book should be added to the wishlist', async function () {
    console.log('\nBook should be added to the wishlist');
    // Verifications for wishlist can be added here
});

When('User removes the book from the wishlist', async function () {
    console.log('\nUser removes the book from the wishlist');
    await wishlist.manageWishlist();
});

Then('Book should be removed from the wishlist', async function () {
    console.log('\nBook should be removed from the wishlist');
    // Verifications for removal can be added here
});

When('User adds the book to the cart from the wishlist', async function () {
    console.log('\nUser adds the book to the cart from the wishlist');
    await wishlist.manageWishlist();
});

Then('Book should be added to the cart', async function () {
    console.log('\nBook should be added to the cart');
    // Verifications for cart can be added here
});
