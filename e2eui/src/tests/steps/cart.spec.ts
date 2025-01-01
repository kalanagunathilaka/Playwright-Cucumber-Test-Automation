import { Given, Then, When } from "@cucumber/cucumber";
import { Login } from "../../pages/login";
import { Cart } from "../../pages/cart";
import { Book } from "../../models/Book";

const login = new Login();
const cartPage = new Cart();

Given("an user has logged in", async function () {
  await login.login();
  console.log("\nUser has logged in");
});

Given("an user has not logged in", async function () {
  await login.verifyNotLoggedIn();
  console.log("\nUser has not logged in");
});

When("the user adds the book to cart via Home page", async function () {
  console.log("\nAdding the book to cart via Home page");
  this.book = await cartPage.addBookToCartViaHomePage();
});

Then("the same book should be added to cart successfully", async function () {
  console.log(
    "\nBook added to cart & to be Verifying... : " +
      this.book.title +
      " - " +
      this.book.price
  );
  await cartPage.verifyItemAddedToCart(this.book);
});

When("the user removes the same book from cart", async function () {
  console.log("\nRemoving the book from cart");
  await cartPage.removeBookFromCart(this.book);
});

Then(
  "the same book should be removed from cart successfully",
  async function () {
    await cartPage.verifyItemRemovedFromCart(this.book);
  }
);

When("the user increase the quantity of the book in cart", async function () {
  this.cartItem = await cartPage.increaseQuantityOfBookInCart(this.book);
});

Then(
  "the quantity of the book should be updated successfully",
  async function () {
    await cartPage.verifyBookQuantityUpdated(this.cartItem, "+");
  }
);

When("the user clears the cart", async function () {
  await cartPage.clearCart();
});

Then("the cart should be cleared successfully", async function () {
  await cartPage.verifyCartCleared();
});

When("the user checks out the cart", async function () {
  await cartPage.checkoutCart();
});

Then("the cart should be redirected to the checkout page", async function () {
  await cartPage.verifyCartRedirectedToCheckout();
});
