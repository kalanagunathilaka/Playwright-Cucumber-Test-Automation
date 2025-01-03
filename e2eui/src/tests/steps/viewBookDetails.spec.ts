import { Given, Then, When } from "@cucumber/cucumber";
import { BookDetails } from "../../pages/bookDetails";
import { PlaywrightConfig } from "../../utils/playwrightConfig";


const playwrightConfig = PlaywrightConfig.getInstance();
const bookDetails = new BookDetails(playwrightConfig);



When("the user selects two random books from the Home page", async function () {
    console.log("\nSelecting and verifying two random books...");
     this.selctedBooksWithIndex= await bookDetails.selectTwoBooks();
  });
  

Then("the details of both books should be displayed correctly", async function () {
  console.log("\nVerifying book details...");
  
    await bookDetails.verifyBookDetails(this.selctedBooksWithIndex);
 
});