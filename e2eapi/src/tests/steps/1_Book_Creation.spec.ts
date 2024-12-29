import { Given, setDefaultTimeout, When } from '@cucumber/cucumber';
import { BookCreation } from '../../requests/BookCreation';

setDefaultTimeout(60 * 1000);

Given('Send Create a new book request', async function () {
    console.log('Send Create a new book request');
    const bookCreation: BookCreation = new BookCreation(this.context);
    await bookCreation.validBookCreation();
});