import { APIRequestContext, expect } from "@playwright/test";
import { RequestHandler } from "../utils/RequestHandler";
import { ServerResponse } from "../models/ServerResponse";
import { UserRole } from "../data/enum/UserRole";
import { EndPoint } from "../data/enum/EndPoint";
import { ResponseStatusCode } from "../data/enum/ResponseStatusCode";
import { Book } from "../models/Book";

export class BookCreation {

    private request: APIRequestContext;
    private requestHandler: RequestHandler;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.requestHandler = new RequestHandler(this.request);
    }

    public async validBookCreation(userRole: UserRole = UserRole.ADMIN) : Promise<Book> {
        const uniqueTimestamp = new Date().getTime();
        const randomStr = `API_Test_${uniqueTimestamp}`;
    
        const book: Book = {
            //id: data.sharedData.randomInt,
            title: `${randomStr}_TITLE`,
            author: `${randomStr}_AUTHOR`,
        };
        const response: ServerResponse = await this.requestHandler.postRequest(userRole, EndPoint.CREATEBOOK, book);
        
        if (userRole === UserRole.UNAUTHORIZED) {
            expect(response.status).toBe(ResponseStatusCode.UNAUTHORIZED);
            expect(response.statusText).toBe('');
            console.log('Unauthorized user cannot create a book');
            return {} as Book;
        }

        expect(response.status).toBe(ResponseStatusCode.CREATED);
        expect(response.statusText).toBe('');
        expect(response.json.title).toBe(`${randomStr}_TITLE`);
        expect(response.json.author).toBe(`${randomStr}_AUTHOR`);
    
        console.log(`Id: ${response.json.id} Title: ${response.json.title} Book created successfully`);
        return response.json;
    }
}