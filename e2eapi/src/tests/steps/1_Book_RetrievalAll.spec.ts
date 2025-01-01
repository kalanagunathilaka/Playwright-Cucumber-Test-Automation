import { Given, Then } from "@cucumber/cucumber";
import { BookCreation } from "../../requests/BookCreation";
import { BookRetrievalAll } from "../../requests/BookRetrievalAll";
import { UserRole } from "../../data/enum/UserRole";

Given('There should be a book in the system', async function () {
    console.log('\nThere should be a book in the system');
    const bookCreation = new BookCreation(this.context);
    this.bookDetails = await bookCreation.validBookCreation();
});

Then('Admin Send Retrieve all books request', async function () {
    console.log('\nAdmin Send Retrieve all books request');
    const bookRetrievalAll = new BookRetrievalAll(this.context);
    await bookRetrievalAll.retrieveAllBooks(UserRole.ADMIN, this.bookDetails);
});

Then('User Send Retrieve all books request', async function () {
    console.log('\nUser Send Retrieve all books request');
    const bookRetrievalAll = new BookRetrievalAll(this.context);
    await bookRetrievalAll.retrieveAllBooks(UserRole.USER, this.bookDetails);
});

Then('Unauthorized User Send Retrieve all books request', async function () {
    console.log('\nUnauthorized User Send Retrieve all books request');
    const bookRetrievalAll = new BookRetrievalAll(this.context);
    await bookRetrievalAll.retrieveAllBooks(UserRole.UNAUTHORIZED, this.bookDetails);
});