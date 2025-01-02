import { Given, When, Then } from '@cucumber/cucumber';
import { Wishlist } from '../../pages/wishlist';

const wishlist = new Wishlist();

Given('Navigate to the home page', async function () {
  console.log('\nNavigate to the home page');
  await wishlist.navigateToHomePage();
});

Then('Verify the wishlist icon is not visible', async function () {
  console.log('\nVerify the wishlist icon is not visible');
  await wishlist.verifyWishlistIconNotVisible();
});

Given('User is logged in', async function () {
  console.log('\nUser is logged in');
  await wishlist.ensureUserIsLoggedIn();
});

When('User clicks the wishlist icon of a book', async function () {
  console.log('\nUser clicks the wishlist icon of a book');
  await wishlist.addBookToWishlist();
});

Then('The book should be added to the wishlist', async function () {
  console.log('\nThe book should be added to the wishlist');
  await wishlist.verifyBookInWishlist();
});

Given('A book is already in the wishlist', async function () {
  console.log('\nA book is already in the wishlist');
  await wishlist.ensureBookInWishlist();
});

When('User removes the book from the wishlist', async function () {
  console.log('\nUser removes the book from the wishlist');
  await wishlist.removeBookFromWishlist();
});

Then('The book should no longer be in the wishlist', async function () {
  console.log('\nThe book should no longer be in the wishlist');
  await wishlist.verifyBookNotInWishlist();
});

When('User adds the book to the cart from the wishlist', async function () {
  console.log('\nUser adds the book to the cart from the wishlist');
  await wishlist.addBookToCartFromWishlist();
});

Then('The book should be added to the cart', async function () {
  console.log('\nThe book should be added to the cart');
  await wishlist.verifyBookInCart();
});
