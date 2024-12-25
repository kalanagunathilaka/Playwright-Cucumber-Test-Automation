import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { BookCreation } from '../../requests/BookCreation';
import { BookUpdate } from '../../requests/BookUpdate';
import { APIRequestContext, request } from 'playwright';
import { expect } from 'playwright/test';

setDefaultTimeout(60 * 1000);

let bookId: string;
let updatedBook = { title: "Updated Book Title", author: "Updated Author"};

Given('an admin has created a book', async function () {
    const context: APIRequestContext = await request.newContext();
    const bookCreation = new BookCreation(context);
    const book = await bookCreation.validBookCreation(); // Create the book
    bookId = book.id;
    console.log(`Book created: ${bookId} - ${book.title}`);
});

When('the admin updates the book details', async function () {
    const context: APIRequestContext = await request.newContext();
    const bookUpdate = new BookUpdate(context);
    await bookUpdate.authorizedRequest(bookId, updatedBook); 
});

Then('the book should be updated successfully', async function () {
    console.log(`Book update successful for ${bookId}`);
});
