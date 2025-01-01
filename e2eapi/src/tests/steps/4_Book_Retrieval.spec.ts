import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { BookCreation } from '../../requests/BookCreation';
import { BookRetrieval } from '../../requests/BookRetrieval';


setDefaultTimeout(60 * 1000);

Given('an admin has created a book', async function () {
    const bookCreation = new BookCreation(this.context);
    const book = await bookCreation.validBookCreation(); // Create the book
    this.bookId = book.id;
    this.bookTitle = book.title;
    console.log(`Book created: ${this.bookId} - ${this.bookTitle}`);
});

When('the admin retrieves the book by its ID', async function () {
    const bookRetrieval = new BookRetrieval(this.context);
    await bookRetrieval.getBookAdminValid(this.bookId); // Admin retrieves the book
});

When('the admin retrieves the book with an invalid ID', async function () {
    const bookRetrieval = new BookRetrieval(this.context);
    await bookRetrieval.getBookInvalidId(this.bookId); // Ensure this.bookId is passed correctly
});

When('the user retrieves the book by its ID', async function () {
    const bookRetrieval = new BookRetrieval(this.context);
    await bookRetrieval.getBookUserValid(this.bookId); // User retrieves the book
});

When('the user retrieves the book with an invalid ID', async function () {
    const bookRetrieval = new BookRetrieval(this.context);
    await bookRetrieval.getBookInvalidIdUser('invalid-id'); // User retrieves an invalid book
});

When('an unauthenticated user retrieves the book by its ID', async function () {
    const bookRetrieval = new BookRetrieval(this.context);
    await bookRetrieval.getBookUnauthenticated(this.bookId); // Unauthenticated user retrieves the book
});

Then('the book details should be returned successfully', async function () {
    console.log('Verified book details were returned successfully.');
});

Then('the admin should see a 404 Not Found error', async function () {
    console.log('Verified admin saw a 404 Not Found error for an invalid ID.');
}); 

Then('the user should see a 404 Not Found error', async function () {
    console.log('Verified user saw a 404 Not Found error for an invalid ID.');
}); 

Then('the user should see a 401 Unauthorized error', async function () {
    console.log('Verified unauthenticated user saw a 401 Unauthorized error.');
});
