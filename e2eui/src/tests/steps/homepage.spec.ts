import { Given, Then, When } from "@cucumber/cucumber";
import { Homepage } from "../../pages/homepage";

const homepage = new Homepage();

Given('Navigate to the homepage', async function () {
    console.log('\nNavigate to the homepage');
    await homepage.verifyHomePage();
});

When('the user change the product category', async function () {
    await homepage.changeBookCategory()
});

Then('the list of books displayed should be updated according to the selected category', async function () {
    await homepage.verifyChangeBookCategory()
});

When('the user enter the name of a book on the search bar and select it', async function () {
    await homepage.searchItemOnSearchBar()

});

Then('the relevant book should be displayed', async function () {
    await homepage.verifySearchedItemOnSearchBar()

});

When('the user change the price from the price filter', async function () {
    await homepage.changePriceFromPriceFilter()

});

Then('the list of books displayed should be updated according to the selected price', async function () {
    await homepage.verifyChangedPriceFromPriceFilter()

});

When("the user adds the book to cart via Home page", async function () {
    console.log("\nAdding the book to cart via Home page");
    this.book = await homepage.addBookToCartViaHomePage();
    
  });

When("the user selects two random books from the Home page", async function () {
    console.log("\nSelecting and verifying two random books...");
     this.selctedBooksWithIndex= await homepage.selectTwoBooks();
  });