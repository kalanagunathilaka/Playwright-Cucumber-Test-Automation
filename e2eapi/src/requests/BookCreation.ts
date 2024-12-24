import { APIRequestContext, expect } from "@playwright/test";
import { RequestHandler } from "../utils/RequestHandler";
import { ServerResponse } from "../models/ServerResponse";
import { UserRole } from "../data/enum/UserRole";
import { EndPoint } from "../data/enum/EndPoint";
import { ResponseStatusCode } from "../data/enum/ResponseStatusCode";
import { Book } from "../models/Book";
import { DataFactory } from "../utils/DataFactory";

export class BookCreation {

    private request: APIRequestContext;
    private requestHandler: RequestHandler;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.requestHandler = new RequestHandler(this.request);
    }

    public async validBookCreation(){
        const data = DataFactory.getInstance().getData();
        const book: Book = {
            //id: data.sharedData.randomInt,
            title: `${data.sharedData.randomStr}_TITLE`,
            author: `${data.sharedData.randomStr}_AUTHOR`
        }
        const response: ServerResponse = await this.requestHandler.postRequest(UserRole.ADMIN, EndPoint.CREATEBOOK, book);

        expect(response.status).toBe(ResponseStatusCode.CREATED);
        expect(response.statusText).toBe('');
        expect(response.json.title).toBe(`${data.sharedData.randomStr}_TITLE`);
        expect(response.json.author).toBe(`${data.sharedData.randomStr}_AUTHOR`);

        console.log(`Book : ${data.sharedData.randomStr}_TITLE Successfully Saved.`);
        book.id = response.json.id;
        return book;
    }
}