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

    public async authorizedRequest(bookId: string, updatedBook: any) {
        const response: ServerResponse = await this.requestHandler.putRequest(UserRole.ADMIN, EndPoint.UPDATEBOOK, bookId, updatedBook);
        expect(response.status).toBe(ResponseStatusCode.OK);
        console.log(`Admin successfully updated book: ${bookId}`);
    }
}
