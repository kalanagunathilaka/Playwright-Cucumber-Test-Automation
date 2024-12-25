import { APIRequestContext, APIResponse } from "@playwright/test";
import { DataFactory } from "./DataFactory";
import { UserRole } from "../data/enum/UserRole";
import { BaseUrl } from "../data/enum/BaseUrl";
import { ServerResponse } from "../models/ServerResponse";
import { EndPoint } from "../data/enum/EndPoint";
import { Book } from "../models/Book";

export class RequestHandler {
   
    private request: APIRequestContext;
    private factoryData: DataFactory;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.factoryData = DataFactory.getInstance();
    }


    public async getRequest(userRole: UserRole, endPoint: string, param = "") {
        const headers = this.setHeader(userRole);
        const response = await this.request.get(`${BaseUrl.LOCAL}/${endPoint}/${param}`, { headers: headers });
        return this.getResponse(response);
    }

    public async postRequest(userRole: UserRole, endPoint: string, body: any, param = "") {
        const headers = this.setHeader(userRole);
        const response = await this.request.post(`${BaseUrl.LOCAL}/${endPoint}/${param}`, { headers: headers, data: body });
        return this.getResponse(response);
    }

    public async putRequest(userRole: UserRole, endPoint: string, body: any, param = "") {
        const headers = this.setHeader(userRole);
        const response = await this.request.put(`${BaseUrl.LOCAL}/${endPoint}/${param}`, { headers: headers, data: body });
        return this.getResponse(response);
    }

    public async deleteRequest(userRole: UserRole, endPoint: string, param : string) {
        const headers = this.setHeader(userRole);
        const url=`${BaseUrl.LOCAL}/${endPoint}/${param}`;
        const response = await this.request.delete(`${BaseUrl.LOCAL}/${endPoint}/${param}`, { headers: headers });
        return this.getResponse(response);
    }

    private setHeader(userRole: UserRole) {
        const data = this.factoryData.getData();
        const headers: any = {};

        if (userRole === UserRole.UNAUTHENTICATED) {
            return headers;
        }

        const username: string = userRole === UserRole.ADMIN ? data.authentication.admin : data.authentication.user;
        const password: string = data.authentication.password;

        const userCredentials = Buffer.from(`${username}:${password}`).toString('base64');
        
        headers["Authorization"] = `Basic ${userCredentials}`;
        return headers;
    }

    private async getResponse(response: APIResponse) {
        let json;
        const contentType = response.headers()['content-type'] || '';
        if (contentType.includes('application/json')) {
            json = await response.json();
        } else {
            const text = await response.text();
            json = JSON.stringify(text);
        }
        const serverResponse: ServerResponse = {
            json,
            status: response.status(),
            statusText: response.statusText()
        }
        return serverResponse;
    }
}