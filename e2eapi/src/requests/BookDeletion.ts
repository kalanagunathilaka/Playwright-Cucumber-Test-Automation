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

    public async validBookDeletion(bookId: string){
        // const bookCreation: BookCreation = new BookCreation(this.request);
        // const book = await bookCreation.validBookCreation();
       
        const response: ServerResponse = await this.requestHandler.deleteRequest(UserRole.ADMIN, EndPoint.DELETEBOOK,bookId);
        expect(response.status).toBe(ResponseStatusCode.NO_CONTENT);
        expect(response.statusText).toBe('');
        console.log(`Book ${bookId} successfully deleted.`);
        
    }
}