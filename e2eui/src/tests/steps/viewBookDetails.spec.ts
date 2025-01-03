import { Given, Then, When } from "@cucumber/cucumber";
import { BookDetails } from "../../pages/bookDetails";
import { PlaywrightConfig } from "../../utils/playwrightConfig";


const playwrightConfig = PlaywrightConfig.getInstance();
const bookDetails = new BookDetails(playwrightConfig);

Given("the user has logged in", async function () {
  console.log("\nUser is logging in...");
  
});

When("the user selects two random books from the Home page", async function () {
    console.log("\nSelecting and verifying two random books...");
    await bookDetails.selectAndVerifyTwoBooks();
  });
  

Then("the details of both books should be displayed correctly", async function () {
  console.log("\nVerifying book details...");
  for (const book of this.selectedBooks) {
    await bookDetails.verifyBookDetails(book);
 }
});
