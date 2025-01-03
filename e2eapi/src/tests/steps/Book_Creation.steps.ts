import { BookRetrievalAll } from '../../requests/BookRetrievalAll';
import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { BookCreation } from '../../requests/BookCreation';
import { UserRole } from '../../data/enum/UserRole';
import { BookRetrieval } from '../../requests/BookRetrieval';
import { InvalidBookCreation, InvalidBookCreationDetails } from '../../data/enum/InvalidBookCreation';

setDefaultTimeout(60 * 1000);

When('Admin creates a valid book', async function () {
    console.log('\nAdmin creates a valid book');
    const bookCreation: BookCreation = new BookCreation(this.context);
    this.createdBook = await bookCreation.validBookCreation(UserRole.ADMIN);
});

When('User creates a valid book', async function () {
    console.log('\nUser creates a valid book');
    const bookCreation: BookCreation = new BookCreation(this.context);
    this.createdBook = await bookCreation.validBookCreation(UserRole.USER);
});

When('Unauthorized User creates a valid book', async function () {
    console.log('\nUnauthorized User creates a valid book');
    const bookCreation: BookCreation = new BookCreation(this.context);
    this.createdBook = await bookCreation.validBookCreation(UserRole.UNAUTHORIZED);
});

Then('The book sould be created successfully', async function () {
    console.log('\nThe book sould be created successfully');
    const bookRetrieval: BookRetrieval = new BookRetrieval(this.context);
    await bookRetrieval.getBookAdminValid(this.createdBook.id);
});

When('Admin creates the same book again', async function () {
    console.log('\nAdmin Creates the same book again');
    const bookCreation: BookCreation = new BookCreation(this.context);
    await bookCreation.createSameBook(UserRole.ADMIN);
});

When('Admin creates a book with CustomID', async function () {
    console.log('\nAdmin creates a book with CustomID');
    this.customID = new Date().getTime();
    const bookCreation: BookCreation = new BookCreation(this.context);
    await bookCreation.validBookCreation(UserRole.ADMIN, this.customID);
});

Then('Response book id should be equal to CustomID', async function () {
    console.log('\nResponse book id should be equal to CustomID');
    const bookRetrieval: BookRetrieval = new BookRetrieval(this.context);
    await bookRetrieval.getBookAdminValid(this.customID);
});

When('Admin creates a book without mandatory fields', async function () {
    console.log('\nAdmin creates a book without mandatory fields');
    const bookCreation: BookCreation = new BookCreation(this.context);
    await bookCreation.invalidBookCreation(UserRole.ADMIN, InvalidBookCreationDetails[InvalidBookCreation.MANDATORY_FIELDS_NOT_SENT]);
});

When('Admin creates a book with mandatory fields as null', async function () {
    console.log('\nAdmin creates a book with mandatory fields as null');
    const bookCreation: BookCreation = new BookCreation(this.context);
    await bookCreation.invalidBookCreation(UserRole.ADMIN, InvalidBookCreationDetails[InvalidBookCreation.MANDATORY_FIELDS_NULL]);
});

When('Admin creates a book with mandatory fields as empty', async function () {
    console.log('\nAdmin creates a book with mandatory fields as empty');
    const bookCreation: BookCreation = new BookCreation(this.context);
    await bookCreation.invalidBookCreation(UserRole.ADMIN, InvalidBookCreationDetails[InvalidBookCreation.MANDATORY_FIELDS_EMPTY]);
});

When('Admin creates a book without title', async function () {
    console.log('\nAdmin creates a book without title');
    const bookCreation: BookCreation = new BookCreation(this.context);
    await bookCreation.invalidBookCreation(UserRole.ADMIN, InvalidBookCreationDetails[InvalidBookCreation.TITLE_NOT_SENT]);
});

When('Admin creates a book with title as null', async function () {
    console.log('\nAdmin creates a book with title as null');
    const bookCreation: BookCreation = new BookCreation(this.context);
    await bookCreation.invalidBookCreation(UserRole.ADMIN, InvalidBookCreationDetails[InvalidBookCreation.TITLE_NULL]);
});

When('Admin creates a book with title as empty', async function () {
    console.log('\nAdmin creates a book with title as empty');
    const bookCreation: BookCreation = new BookCreation(this.context);
    await bookCreation.invalidBookCreation(UserRole.ADMIN, InvalidBookCreationDetails[InvalidBookCreation.TITLE_EMPTY]);
});