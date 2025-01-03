import { APIRequestContext, expect } from "@playwright/test";
import { RequestHandler } from "../utils/RequestHandler";
import { ServerResponse } from "../models/ServerResponse";
import { UserRole } from "../data/enum/UserRole";
import { EndPoint } from "../data/enum/EndPoint";
import { ResponseStatusCode } from "../data/enum/ResponseStatusCode";
import { Book } from "../models/Book";

export class BookUpdate {
    private request: APIRequestContext;
    private requestHandler: RequestHandler;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.requestHandler = new RequestHandler(this.request);
    }

    public async AdminauthorizedRequest( updatedBook: Book) {
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.ADMIN, EndPoint.UPDATEBOOK, updatedBook,updatedBook.id);
        expect(response.status).toBe(ResponseStatusCode.OK);
        console.log(`Admin successfully updated book: ${updatedBook.id}`);
    }

    public async UserUnauthorizedRequest(updatedBook: Book) {
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.USER, EndPoint.UPDATEBOOK, updatedBook,updatedBook.id);
        expect(response.status).toBe(ResponseStatusCode.FORBIDDEN);
        console.log(`User unauthorized to update book: ${updatedBook.id}`);
    }

    public async UnauthenticatedUserUnauthorizedRequest(updatedBook: Book) {
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.UNAUTHORIZED, EndPoint.UPDATEBOOK, updatedBook,updatedBook.id);
        expect(response.status).toBe(ResponseStatusCode.UNAUTHORIZED);
        console.log(`User unauthorized to update book: ${updatedBook.id}`);
    }

    public async updateBookAdminInvalidId() {
        
        const updatedBook: Book = { id: -1, title: "Invalid Book Update", author: "Invalid Author" };

        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.ADMIN, EndPoint.UPDATEBOOK, updatedBook,updatedBook.id);
        expect(response.status).toBe(ResponseStatusCode.NOT_FOUND);
        console.log(`Admin received 404 Not Found error for book ID: ${updatedBook.id}`);
    }

    public async updateBookUserInvalidId() {
        const updatedBook: Book = { id: -1, title: "Invalid Book Update", author: "Invalid Author" };
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.USER, EndPoint.UPDATEBOOK, updatedBook, updatedBook.id);
        expect(response.status).toBe(ResponseStatusCode.FORBIDDEN); 
        console.log(`User should see a 403 Forbidden error for book ID: ${updatedBook.id}`);
    }







    //Anudhi's
  
    public async updateBookAdminMissingId(updatedBook: Book) {
            const response: ServerResponse = await this.requestHandler.putRequest(UserRole.ADMIN, EndPoint.UPDATEBOOK, updatedBook);
            expect(response.status).toBe(ResponseStatusCode.METHOD_NOT_ALLOWED);
            console.log(`Admin received 405 Method Not Allowed error for missing book ID`);
            return response;
    }

    public async updateBookAdminMissingTitle(updatedBook: Book) {
        const incompleteBook = { ...updatedBook, title: undefined, author: `UpdatedAuthor_${new Date().getTime()}` }; 
        delete incompleteBook.title// Clear title
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.ADMIN, EndPoint.UPDATEBOOK, incompleteBook, incompleteBook.id);
        expect(response.status).toBe(ResponseStatusCode.BAD_REQUEST);
        return response;
        console.log(`Admin received 400 Bad Request error for missing title`);
    }

    public async updateBookAdminMissingAuthor(updatedBook: Book) {
        const incompleteBook = { ...updatedBook, author: undefined }; 
        delete incompleteBook.author// Clear author
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.ADMIN, EndPoint.UPDATEBOOK, incompleteBook, incompleteBook.id);
        expect(response.status).toBe(ResponseStatusCode.BAD_REQUEST);
        return response;
        console.log(`Admin received 400 Bad Request error for missing author`);
    }

    public async updateBookUserMissingId(updatedBook: Book) {
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.USER, EndPoint.UPDATEBOOK, updatedBook);
        expect(response.status).toBe(ResponseStatusCode.METHOD_NOT_ALLOWED);
        return response;
        console.log(`User received 405 Method Not Allowed error for missing book ID`);
    }

    public async updateBookUserMissingTitle(updatedBook: Book) {
        const incompleteBook = { ...updatedBook, title: undefined, author : `UpdatedAuthor_${new Date().getTime()}` }; 
        delete incompleteBook.title// Clear title
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.USER, EndPoint.UPDATEBOOK, incompleteBook, incompleteBook.id);
        expect(response.status).toBe(ResponseStatusCode.FORBIDDEN);
        return response;
        console.log(`User received 403 Forbidden error for missing title`);
    }

    public async updateBookUserMissingAuthor(updatedBook: Book) {
        const incompleteBook = { ...updatedBook, author: undefined, title: `UpdatedTitle_${new Date().getTime()}` }; 
        delete incompleteBook.author// Clear author
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.USER, EndPoint.UPDATEBOOK, incompleteBook, incompleteBook.id);
        expect(response.status).toBe(ResponseStatusCode.FORBIDDEN);
        return response;
        console.log(`User received 403 Forbidden error for missing author`);
    }

}
