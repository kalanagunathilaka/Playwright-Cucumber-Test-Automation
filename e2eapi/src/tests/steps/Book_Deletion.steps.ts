import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { BookCreation } from '../../requests/BookCreation';
import { BookDeletion } from '../../requests/BookDeletion';
import { BookRetrieval } from '../../requests/BookRetrieval';

setDefaultTimeout(60 * 1000);

Given('an admin has created a book', async function () {
    console.log('Admin has created a book');
    const bookCreation = new BookCreation(this.context);
    const book = await bookCreation.validBookCreation(); // Create the book
    this.bookId = book.id;
    this.bookTitle = book.title;
    console.log(`Book created: ${this.bookId} - ${this.bookTitle}`);
});

When('the admin deletes the same book', async function () {
    console.log('Admin deletes the same book');
    const bookDeletion = new BookDeletion(this.context);
    await bookDeletion.deleteBookAdminValid(this.bookId); // Delete the book
});

When('the admin sends the delete request with missing ID', async function () {
    console.log('Admin sends the delete request with missing ID');
    const bookDeletion = new BookDeletion(this.context);
    await bookDeletion.deleteBookAdminInvalidIdMissing(); // Delete the book with missing ID
});

When('the admin deletes the book with an invalid ID', async function () {
    console.log('Admin deletes the book with an invalid ID');
    const bookDeletion = new BookDeletion(this.context);
    await bookDeletion.deleteBookAdminInvalidId(); // Delete the book with invalid ID
});

When('the user tries to delete the same book', async function () {
    console.log('User tries to delete the same book');
    const bookDeletion = new BookDeletion(this.context);
    await bookDeletion.deleteBookUserUnauthorized(this.bookId); // Delete the book as a user
});

When('the user sends the delete request with missing ID', async function () {
    console.log('User sends the delete request with missing ID');
    const bookDeletion = new BookDeletion(this.context);
    await bookDeletion.deleteBookUserInvalidIdMissing(); // Delete the book with missing ID as a user
});

When('the user tries to delete the book with an invalid ID', async function () {
    console.log('User tries to delete the book with an invalid ID');
    const bookDeletion = new BookDeletion(this.context);
    await bookDeletion.deleteBookUserInvalidId(); // Delete the book with invalid ID as a user
});

When('User attempts to delete a book with an invalid ID', async function () {
    console.log('User attempts to delete a book with an invalid ID');
    const bookDeletion = new BookDeletion(this.context);
    await bookDeletion.deleteBookUserInvalidId(); // Delete the book with invalid ID as a user
});

When('the unauthenticated user tries to delete same the book', async function () {
    console.log('Unauthenticated user tries to delete the same book');
    const bookDeletion = new BookDeletion(this.context);
    await bookDeletion.deleteBookUnauthenticated(this.bookId); // Delete the book as an unauthenticated user
});

Then('the book should be deleted successfully', async function () {
    console.log('The book should be deleted successfully');
    const bookRetrieval = new BookRetrieval(this.context);
    await bookRetrieval.getBookInvalidId(this.bookId);
    console.log(`Verified book ${this.bookId} is deleted.`);
});