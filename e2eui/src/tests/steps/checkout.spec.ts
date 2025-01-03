import { Given, Then, When } from "@cucumber/cucumber";
import { Login } from "../../pages/login";
import { Cart } from "../../pages/cart";
import { Checkout } from "../../pages/checkout";
import { Homepage } from "../../pages/homepage";

const login = new Login();
const cartPage = new Cart();
const checkoutPage = new Checkout();
const homepage = new Homepage();

Given("the user has items in the cart", async function () {
  await homepage.addBookToCartViaHomePage();
});

Given("the user has placed orders in the past", async function () {
  
  console.log("\nUser has logged in with past orders");
  await cartPage.checkoutCart();
});

Given("the user is logged in and has not placed any orders", async function () {
  await login.login();
  console.log("\nUser has logged in with no orders placed");
  await checkoutPage.cancelOrder();
});

Given("the user is on the checkout page", async function () {
  await cartPage.checkoutCart();
  console.log("\nUser is on the checkout page");
});

When(
  "the user fills in all required fields",
  async function () {
    console.log("\nFilling in all required fields");
    await checkoutPage.fillCheckoutDetails();
  }
);

When("the user leaves required fields empty", async function () {
  console.log("\nLeaving required fields empty");
  await checkoutPage.emptyCheckoutDetails();
});

When("the user enters an invalid Pincode", async function () {
  console.log("\nEntering invalid Pincode");
  await checkoutPage.invalidCheckoutDetailsPincode();
});


When("the user clicks the Place Order button", async function () {
  console.log("\nUser clicks the Place Order button");
  await  await checkoutPage.placeOrder();
});

When("the user clicks the Cancel button", async function () {
  console.log("\nUser clicks the Cancel button");
  await  await checkoutPage.cancelOrder();
});

Then(
  "an order confirmation page should be displayed with an order ID",
  async function () {
    console.log("\nVerifying order confirmation page with order ID");
    await checkoutPage.verifyOrderConfirmation();
  }
);

Then(
  "an error message should be displayed indicating the missing fields",
  async function () {
    console.log("\nVerifying error message for missing fields");
    await checkoutPage.verifyErrorMessage("Please fill in all required fields");
  }
);

Then(
  "an error message should be displayed",
  async function () {
    console.log("\nVerifying error message for invalid pincode");
    await checkoutPage.verifyErrorMessagePincode(" Pincode must have 6 digits only and cannot start with 0 ");
  }
);

Then("the user should be redirected back to the cart", async function () {
  console.log("\nVerifying redirection back to the cart");
  await checkoutPage.verifyRedirectedToCart();
});

When("the user navigates to the My orders page", async function () {
  console.log(`\nNavigating to the My orders page`);
  
    await checkoutPage.viewOrderHistory();
  
  
});

Then("a list of past orders with order id should be displayed", async function () {
  console.log("\nVerifying list of past orders with order IDs");
  await checkoutPage.verifyPastOrdersDisplayed();
});

Then(
  'a message "You have no orders yet" should be displayed',
  async function () {
    console.log('\nVerifying message: "You have no orders yet"');
    await checkoutPage.verifyNoOrdersMessage();
  }
);
