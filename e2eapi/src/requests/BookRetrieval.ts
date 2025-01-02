import { APIRequestContext,expect } from "@playwright/test";

import { RequestHandler } from "../utils/RequestHandler";
import { ServerResponse } from "../models/ServerResponse";
import { UserRole } from "../data/enum/UserRole";
import { EndPoint } from "../data/enum/EndPoint";
import { ResponseStatusCode } from "../data/enum/ResponseStatusCode";

export class BookRetrieval {
    private request: APIRequestContext;
    private requestHandler: RequestHandler;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.requestHandler = new RequestHandler(this.request);
    }

    public async getBookAdminValid(bookId: string) {
        const response: ServerResponse = await this.requestHandler.getRequest(UserRole.ADMIN, EndPoint.GETBOOKBYID, bookId);
        
        expect(response.status).toBe(ResponseStatusCode.OK);
        expect(response.json).toHaveProperty("id", bookId);
        console.log(`Admin successfully retrieved book: ${bookId}`);
    }

    public async getBookUserValid(bookId: string) {
        const response: ServerResponse = await this.requestHandler.getRequest(UserRole.USER, EndPoint.GETBOOKBYID, bookId);
        
        expect(response.status).toBe(ResponseStatusCode.OK);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty("id", bookId);
        console.log(`User successfully retrieved book: ${bookId}`);
    }

    public async getBookUnauthenticated(bookId: string) {
        const response: ServerResponse = await this.requestHandler.getRequest(UserRole.UNAUTHORIZED, EndPoint.GETBOOKBYID, bookId);

        console.log(response)
        expect(response.status).toBe(ResponseStatusCode.UNAUTHORIZED);
        console.log(`Unauthenticated user unauthorized to retrieve book: ${bookId}`);
        
    }

    public async getBookInvalidId(bookId: string) {
        if (!bookId) {
            console.log("Error: bookId is undefined or empty.");
            return;
        }
    
        // Check if the bookId is a valid number
        const trimmedBookId = bookId.trim();
    
        if (!trimmedBookId || isNaN(Number(trimmedBookId))) {
            // Non-numeric or empty string, expect a 400 Bad Request error
            const response: ServerResponse = await this.requestHandler.getRequest(UserRole.ADMIN, EndPoint.GETBOOKBYID, trimmedBookId);
            
            expect(response.status).toBe(ResponseStatusCode.BAD_REQUEST);
            console.log(`Bad request for invalid book ID: ${trimmedBookId}`);
        } else {
            // Numeric bookId, expect a 404 Not Found error
            const response: ServerResponse = await this.requestHandler.getRequest(UserRole.ADMIN, EndPoint.GETBOOKBYID, trimmedBookId);
            
            expect(response.status).toBe(ResponseStatusCode.NOT_FOUND);
            console.log(`Book not found with ID: ${trimmedBookId}`);
        }
    }
    
    public async getBookInvalidIdUser(bookId: string) {
        if (!bookId) {
            console.log("Error: bookId is undefined or empty.");
            return;
        }
    
        // Check if the bookId is a valid number
        const trimmedBookId = bookId.trim();
    
        if (!trimmedBookId || isNaN(Number(trimmedBookId))) {
            // Non-numeric or empty string, expect a 400 Bad Request error
            const response: ServerResponse = await this.requestHandler.getRequest(UserRole.USER, EndPoint.GETBOOKBYID, trimmedBookId);

            console.log(response)
            expect(response.status).toBe(ResponseStatusCode.BAD_REQUEST);
            console.log(`Bad request for invalid book ID: ${trimmedBookId}`);
        } else {
            // Numeric bookId, expect a 404 Not Found error
            const response: ServerResponse = await this.requestHandler.getRequest(UserRole.USER, EndPoint.GETBOOKBYID, trimmedBookId);

            console.log(response)
            expect(response.status).toBe(ResponseStatusCode.NOT_FOUND); 
            console.log(`Book not found with ID: ${trimmedBookId}`);
        }
    }
    
}
