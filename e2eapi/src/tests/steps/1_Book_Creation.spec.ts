import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { BookCreation } from '../../requests/BookCreation';

setDefaultTimeout(60 * 1000);

Given('Admin creates a valid new book', async function () {
    console.log('Admin creates a valid new book');
    const bookCreation: BookCreation = new BookCreation(this.context);
    await bookCreation.validBookCreation();
});

Then('The book is created successfully', async function () {
    console.log('The book is created successfully');
});