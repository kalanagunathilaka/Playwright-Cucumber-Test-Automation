import { Given, When, Then } from "@cucumber/cucumber";
import { Wishlist } from "../../pages/wishlist";
import { Login } from "../../pages/login";

const wishlist = new Wishlist();
const login = new Login();

// Given('Navigate to the homepage', async function () {
//     console.log('\nNavigate to the homepage');
//     await login.navigateToHomepage();
// });

When('Wishlist icon should not be visible', async function () {
    console.log('\nCheck if the Wishlist icon is not visible');
    await wishlist.verifyWishlistIconNotVisible();
});

Given('User is registered and logged in', async function () {
    console.log('\nUser is registered and logged in');
    const login = new Login();
    await login.login();
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
    await wishlist.removeBookFromWishlist();
});


Then('Book should be removed from the wishlist', async function () {
    console.log('\nBook should be removed from the wishlist');
    await wishlist.verifyBookRemovedFromWishlist();
});

// When('User adds the book to the cart from the wishlist', async function () {
//     console.log('\nUser adds the book to the cart from the wishlist');
//     await wishlist.addBookToCartFromWishlist();
// });

When('User adds the book to the cart from the wishlist', async function () {
    console.log('\nUser adds the book to the cart from the wishlist');
    await wishlist.addBookToCartFromWishlist();});

Then('New Book should be added to the cart', async function () {
    console.log('\nNew Book should be added to the wishlist');
    await wishlist.verifyBookAddedToCart();
});

// When('User removes the book from the cart', async function () {
//     console.log('\nUser removes the book from the cart');
//     await wishlist.removeBookFromCart();
// });

// Then('Book should be removed from the cart', async function () {
//     console.log('\nBook should be removed from the cart');
//     await wishlist.verifyBookRemovedFromCart();
// });