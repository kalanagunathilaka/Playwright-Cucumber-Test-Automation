import { Given, setDefaultTimeout } from '@cucumber/cucumber';
import { BookCreation } from '../../requests/BookCreation';
import { APIRequestContext, request } from 'playwright';

setDefaultTimeout(60 * 1000);

Given('Send Create a new book request', async () => {
    console.log('Send Create a new book request');
    const context: APIRequestContext = await request.newContext();
    const bookCreation: BookCreation = new BookCreation(context);
    await bookCreation.validBookCreation();
});