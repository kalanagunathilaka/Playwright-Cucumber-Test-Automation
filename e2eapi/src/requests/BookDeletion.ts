import { APIRequestContext, expect } from "@playwright/test";
import { RequestHandler } from "../utils/RequestHandler";
import { ServerResponse } from "../models/ServerResponse";
import { UserRole } from "../data/enum/UserRole";
import { EndPoint } from "../data/enum/EndPoint";
import { ResponseStatusCode } from "../data/enum/ResponseStatusCode";
import { Book } from "../models/Book";
import { DataFactory } from "../utils/DataFactory";
import { BookCreation } from "./BookCreation";

export class BookDeletion {

    private request: APIRequestContext;
    private requestHandler: RequestHandler;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.requestHandler = new RequestHandler(this.request);
    }

    public async deleteBookAdminValid(bookId: string){
        // const bookCreation: BookCreation = new BookCreation(this.request);
        // const book = await bookCreation.validBookCreation();
       
        const response: ServerResponse = await this.requestHandler.deleteRequest(UserRole.ADMIN, EndPoint.DELETEBOOK,bookId);
        expect(response.status).toBe(ResponseStatusCode.NO_CONTENT);
        expect(response.statusText).toBe('');
        console.log(`Book ${bookId} successfully deleted.`);
        
    }

    public async deleteBookAdminInvalidIdMissing() {
        const response: ServerResponse = await this.requestHandler.deleteRequest(UserRole.ADMIN, EndPoint.DELETEBOOK, '');
        expect(response.status).toBe(ResponseStatusCode.BAD_REQUEST); 
        console.log(`Admin failed to delete book: ID is missing`);
    }

    public async deleteBookAdminInvalidId() {
        const invalidBookId = -1; // Use an invalid integer ID that cannot exist in the system
        const response: ServerResponse = await this.requestHandler.deleteRequest(UserRole.ADMIN, EndPoint.DELETEBOOK, invalidBookId.toString());
        expect(response.status).toBe(ResponseStatusCode.NOT_FOUND); 
        console.log(`Admin failed to delete book: Invalid ID ${invalidBookId}`);
    }

    public async deleteBookUserUnauthorized(bookId: string) {
        const response: ServerResponse = await this.requestHandler.deleteRequest(UserRole.USER, EndPoint.DELETEBOOK, bookId);
        expect(response.status).toBe(ResponseStatusCode.FORBIDDEN);
        console.log(`User unauthorized to delete book: ${bookId}`);
    }

    public async deleteBookUserInvalidIdMissing() {
        const response: ServerResponse = await this.requestHandler.deleteRequest(UserRole.USER, EndPoint.DELETEBOOK, '');
        expect(response.status).toBe(ResponseStatusCode.FORBIDDEN); 
        console.log(`User unauthorized to delete book: ID missing`);
    }

    public async deleteBookUserInvalidId() {
        const invalidBookId = -1; 
        const response: ServerResponse = await this.requestHandler.deleteRequest(UserRole.USER, EndPoint.DELETEBOOK, invalidBookId.toString());
        expect(response.status).toBe(ResponseStatusCode.FORBIDDEN); 
        console.log(`User unauthorized to delete book: Invalid ID ${invalidBookId}`);
    }

    public async deleteBookUnauthenticated(bookId: string) {
        const response: ServerResponse = await this.requestHandler.deleteRequest(UserRole.UNAUTHORIZED, EndPoint.DELETEBOOK, bookId);
        expect(response.status).toBe(ResponseStatusCode.UNAUTHORIZED);
        console.log(`Unauthenticated user unauthorized to delete book: ${bookId}`);
    }




}