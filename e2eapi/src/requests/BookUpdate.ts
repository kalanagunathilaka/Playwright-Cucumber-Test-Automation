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
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.ADMIN, EndPoint.UPDATEBOOK, updatedBook);
        expect(response.status).toBe(ResponseStatusCode.OK);
        console.log(`Admin successfully updated book: ${updatedBook.id}`);
    }

    public async UserUnauthorizedRequest(updatedBook: Book) {
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.USER, EndPoint.UPDATEBOOK, updatedBook);
        expect(response.status).toBe(ResponseStatusCode.UNAUTHORIZED);
        console.log(`User unauthorized to update book: ${updatedBook.id}`);
    }

    public async UnauthenticatedUserUnauthorizedRequest(updatedBook: Book) {
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.UNAUTHENTICATED, EndPoint.UPDATEBOOK, updatedBook);
        expect(response.status).toBe(ResponseStatusCode.UNAUTHORIZED);
        console.log(`User unauthorized to update book: ${updatedBook.id}`);
    }

    public async updateBookAdminInvalidId() {
        const invalidBookId = "invalid-id";
        const updatedBook: Book = { id: invalidBookId, title: "Invalid Book Update", author: "Invalid Author" };

        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.ADMIN, EndPoint.UPDATEBOOK, updatedBook);
        expect(response.status).toBe(ResponseStatusCode.NOT_FOUND);
        console.log(`Admin received 404 Not Found error for book ID: ${invalidBookId}`);
    }

    // public async updateBookAdminInvalidId() {
    //     const invalidBookId = "invalid-id";
    //     const response: ServerResponse = await this.requestHandler.putRequest(
    //         UserRole.ADMIN,
    //         `${EndPoint.UPDATEBOOK}/${invalidBookId}`,
    //         updatedBook
    //     );
    //     expect(response.status).toBe(ResponseStatusCode.NOT_FOUND);
    //     console.log(`Admin attempted to update invalid book ID: ${invalidBookId}`);
    // }
    

    
    
    
}
