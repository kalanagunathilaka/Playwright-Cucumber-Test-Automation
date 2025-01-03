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