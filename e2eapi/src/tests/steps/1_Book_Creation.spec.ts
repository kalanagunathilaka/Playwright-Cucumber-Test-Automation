import { BookRetrievalAll } from './../../requests/BookRetrievalAll';
import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { BookCreation } from '../../requests/BookCreation';
import { UserRole } from '../../data/enum/UserRole';

setDefaultTimeout(60 * 1000);

Given('Admin creates a valid book', async function () {
    console.log('\nAdmin creates a valid book');
    const bookCreation: BookCreation = new BookCreation(this.context);
    this.createdBook = await bookCreation.validBookCreation(UserRole.ADMIN);
});

Given('User creates a valid book', async function () {
    console.log('\nUser creates a valid book');
    const bookCreation: BookCreation = new BookCreation(this.context);
    this.createdBook = await bookCreation.validBookCreation(UserRole.USER);
});

Given('Unauthorized User creates a valid book', async function () {
    console.log('\nUnauthorized User creates a valid book');
    const bookCreation: BookCreation = new BookCreation(this.context);
    this.createdBook = await bookCreation.validBookCreation(UserRole.UNAUTHORIZED);
});

Then('The book sould be created successfully', async function () {
    console.log('\nThe book sould be created successfully');
    const bookRetrievalAll: BookRetrievalAll = new BookRetrievalAll(this.context);
    await bookRetrievalAll.retrieveAllBooks(UserRole.ADMIN, this.createdBook);
});