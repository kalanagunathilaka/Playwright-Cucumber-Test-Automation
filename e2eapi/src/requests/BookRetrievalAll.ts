import { UserRole } from './../data/enum/UserRole';
import { APIRequestContext } from "playwright";
import { RequestHandler } from "../utils/RequestHandler";
import { ServerResponse } from "../models/ServerResponse";
import { expect } from "playwright/test";
import { EndPoint } from '../data/enum/EndPoint';
import { Book } from '../models/Book';
import { ResponseStatusCode } from '../data/enum/ResponseStatusCode';

export class BookRetrievalAll {
    private request: APIRequestContext;
    private requestHandler: RequestHandler;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.requestHandler = new RequestHandler(this.request);
    }

    public async retrieveAllBooks(userRole: UserRole, givenBook?: Book) { 
        const response: ServerResponse = await this.requestHandler.getRequest(userRole, EndPoint.GETALLBOOKS);
        
        if(userRole === UserRole.UNAUTHORIZED) {
            expect(response.status).toBe(ResponseStatusCode.UNAUTHORIZED);
            console.log(`${userRole} tried to retrieve all books without authentication.`);
            return;
        }

        expect(response.status).toBe(ResponseStatusCode.OK);
        expect(response.json).toBeInstanceOf(Array);

        if (givenBook) {
            const bookFound = response.json.find((book: Book) => book.title === givenBook.title && book.author === givenBook.author);
            expect(bookFound).toBeTruthy();
        }

        console.log(`${userRole} retrieved all books successfully.`);
        return response.json;
    }
}