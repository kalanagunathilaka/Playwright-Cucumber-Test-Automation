import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { BookCreation } from '../../requests/BookCreation';
import { APIRequestContext, request } from 'playwright';
import { UserRole } from '../../data/enum/UserRole';
import { EndPoint } from '../../data/enum/EndPoint';
import { BookDeletion } from '../../requests/BookDeletion';
import { RequestHandler } from '../../utils/RequestHandler';
import { ResponseStatusCode } from '../../data/enum/ResponseStatusCode';
import { expect } from 'playwright/test';
import { BaseUrl } from '../../data/enum/BaseUrl';

setDefaultTimeout(60 * 1000);

let bookId: string; 
let bookTitle: string; 



Given('an admin has created a book', async function () {
    const context: APIRequestContext = await request.newContext();
    const bookCreation = new BookCreation(context);
    const book = await bookCreation.validBookCreation(); // Create the book
    bookId = book.id;
    bookTitle = book.title;
    console.log(`Book created: ${bookId} - ${bookTitle}`);
});

When('the admin deletes the same book', async function () {
    const context: APIRequestContext = await request.newContext();
    const bookDeletion = new BookDeletion(context);
    await bookDeletion.validBookDeletion(bookId); // Delete the book
});

Then('the book should be deleted successfully', async function () {
    //ToDo : Replace After implementing the getBookById
    const requestHandler = new RequestHandler(this.request);
    const response = await requestHandler.getRequest(UserRole.ADMIN, `${BaseUrl.LOCAL}/${EndPoint.GETBOOKBYID}`, bookId);
    expect(response.status).toBe(ResponseStatusCode.NOT_FOUND); // Validate book no longer exists
    console.log(`Verified book ${bookId} is deleted.`);
});