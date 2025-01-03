import { Given, Then, When } from "@cucumber/cucumber";
import { Login } from "../../pages/login";
import { Cart } from "../../pages/cart";
import { Book } from "../../models/Book";
import { Homepage } from "../../pages/homepage";


const cartPage = new Cart();


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

Then("the same book should be removed from cart successfully",
  async function () {
    await cartPage.verifyItemRemovedFromCart(this.book);
  }
);

When("the user increase the quantity of the book in cart", async function () {
  this.cartItem = await cartPage.increaseQuantityOfBookInCart(this.book);
});

Then("the quantity of the book should be increased successfully",
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


When("the user decrease the quantity of the book in cart", async function () {
  this.cartItem = await cartPage.decreaseQuantityOfBookInCart(this.book);
});

Then("the quantity of the book should be decrease successfully",
  async function () {
    await cartPage.verifyBookQuantityUpdated(this.cartItem, "-");
  }
);

Then('Book should be added to the cart', async function () {
  console.log('\nCheck if the book is added to the cart');
  await cartPage.verifyBookAddedToCart();
});




