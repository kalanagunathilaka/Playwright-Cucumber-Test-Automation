import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { BookCreation } from '../../requests/BookCreation';
import { BookUpdate } from '../../requests/BookUpdate';
import { expect } from 'playwright/test';
import { RequestHandler } from '../../utils/RequestHandler';
import { UserRole } from '../../data/enum/UserRole';
import { EndPoint } from '../../data/enum/EndPoint';
import { ResponseStatusCode } from '../../data/enum/ResponseStatusCode';
import { Book } from '../../models/Book';
import { BookRetrieval } from '../../requests/BookRetrieval';

setDefaultTimeout(60 * 1000);


let updatedBook: Book = { id: "", title: `Updated_Title_${new Date().getTime()}`, author: "Updated Author" };


Given('an Admin has created a book', async function () {
 
    const bookCreation = new BookCreation(this.context);
    const book = await bookCreation.validBookCreation(); // Create the book
    this.bookId = book.id;
    this.bookTitle = book.title;
    console.log(`Book created: ${this.bookId} - ${book.title}`);
});

When('the admin updates the book details', async function () {
    
    const bookUpdate = new BookUpdate(this.context);
    console.log(`Updating book: ${this.bookId} - ${updatedBook.title}`);
    updatedBook.id = this.bookId;
    
    await bookUpdate.AdminauthorizedRequest(updatedBook); 
});

Then('the book should be updated successfully', async function () {
    // Validate the book details
    const bookRetrieval = new BookRetrieval(this.context);
    const response = await bookRetrieval.getBookAdminValid(this.bookId);
    expect(response.title).toBe(updatedBook.title);
    expect(response.author).toBe(updatedBook.author);
    console.log(`Book update successful for ${this.bookId}`);
});

When('the user updates the book details', async function () {
 
    const bookUpdate = new BookUpdate(this.context);
    console.log(`Attempting to update book as user: ${this.bookId} - ${updatedBook.title}`);
    updatedBook.id = this.bookId;

    await bookUpdate.UserUnauthorizedRequest(updatedBook);
});

When('the unauthenticated user updates the book details', async function () {

    const bookUpdate = new BookUpdate(this.context);
    console.log(`Attempting to update book as user: ${this.bookId} - ${updatedBook.title}`);
    updatedBook.id = this.bookId;

    await bookUpdate.UnauthenticatedUserUnauthorizedRequest(updatedBook);
});

When('the admin updates the book with an invalid ID', async function () {
    const bookUpdate = new BookUpdate(this.context);
    await bookUpdate.updateBookAdminInvalidId(); 
});

When('the user updates the book with an invalid ID', async function () {
    const bookUpdate = new BookUpdate(this.context);
    await bookUpdate.updateBookUserInvalidId(); 
});


Then('the book should not be updated', async function () {
    // Validate that the book details have not changed
    const bookRetrieval = new BookRetrieval(this.context);
    const response = await bookRetrieval.getBookAdminValid(this.bookId);
    console.log(`Response after unauthorized update attempt: ${response}`);
    expect(response.title).not.toBe(updatedBook.title); // Title should not have been updated
    expect(response.author).not.toBe(updatedBook.author); // Author should not have been updated
    console.log(`Unauthorized book update was correctly prevented for ${this.bookId}`);
});

// Anudhi's

When('the admin sends the update request with missing ID', async function () {
     const bookUpdate = new BookUpdate(this.context);
     updatedBook.id = this.bookId;
     console.log('Admin attempting to update book with missing ID');
     this.response = await bookUpdate.updateBookAdminMissingId(updatedBook);
});

Then('the admin should see a 405 Method Not Allowed error', async function () {
    expect(this.response.status).toBe(ResponseStatusCode.METHOD_NOT_ALLOWED);
    console.log('Received expected error: 405 Method Not Allowed');
});

When('the admin sends the update request with missing title', async function () {
    const bookUpdate = new BookUpdate(this.context);
    updatedBook.id = this.bookId;
    console.log('Admin attempting to update book with missing title');
    this.response =await bookUpdate.updateBookAdminMissingTitle(updatedBook);
});

Then('the admin should see a 400 Bad Request error', async function () {
    expect(this.response.status).toBe(ResponseStatusCode.BAD_REQUEST);
    console.log('Received expected error: 400 Bad Request');
});

When('the admin sends the update request with missing author', async function () {
    const bookUpdate = new BookUpdate(this.context);
    updatedBook.id = this.bookId;
    updatedBook.title = this.bookTitle;
    console.log('Admin attempting to update book with missing author');
    this.response =await bookUpdate.updateBookAdminMissingAuthor(updatedBook);
});

When('the user sends the update request with missing ID', async function () {
    const bookUpdate = new BookUpdate(this.context);
    updatedBook.id = this.bookId;
    console.log('User attempting to update book with missing ID');
    this.response =await bookUpdate.updateBookUserMissingId(updatedBook);

});

Then('the user should see a 405 Method Not Allowed error', async function () {
    expect(this.response.status).toBe(ResponseStatusCode.METHOD_NOT_ALLOWED);
    console.log('Received expected error: 405 Method Not Allowed');
});

When('the user sends the update request with missing title', async function () {
    const bookUpdate = new BookUpdate(this.context);
    updatedBook.id = this.bookId;
    console.log('User attempting to update book with missing title');
    this.response =await bookUpdate.updateBookUserMissingTitle(updatedBook);
});

Then('the user should see a 403 Forbidden error', async function () {
    expect(this.response.status).toBe(ResponseStatusCode.FORBIDDEN);
    console.log('Received expected error: 403 Forbidden');
});

When('the user sends the update request with missing author', async function () {
    const bookUpdate = new BookUpdate(this.context);
    updatedBook.id = this.bookId;
    console.log('User attempting to update book with missing author');
    this.response =await bookUpdate.updateBookUserMissingAuthor(updatedBook);
});

Then('the user should see a 400 Forbidden error', async function () {
    expect(this.response.status).toBe(ResponseStatusCode.BAD_REQUEST);
    console.log('Received expected error: 400 Bad Request');
});







