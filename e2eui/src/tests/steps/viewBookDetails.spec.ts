import { Given, Then, When } from "@cucumber/cucumber";
import { BookDetails } from "../../pages/bookDetails";
import { PlaywrightConfig } from "../../utils/playwrightConfig";
import { Homepage } from "../../pages/homepage";


const playwrightConfig = PlaywrightConfig.getInstance();
const bookDetails = new BookDetails(playwrightConfig);


Then("the details of both books should be displayed correctly", async function () {
  console.log("\nVerifying book details...");

  await bookDetails.verifyBookDetails(this.selctedBooksWithIndex);

});

When("the user adds the book to cart via Item detail Page", async function () {
  console.log("\nAdding the book to cart via Item detail page");
  this.book = await bookDetails.addBookToCartViaItemDetailPage();
});