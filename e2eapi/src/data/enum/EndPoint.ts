const BASE_URL = "api/books";

export enum EndPoint {
    GETALLBOOKS = `${BASE_URL}`,
    GETBOOKBYID = `${BASE_URL}`,
    CREATEBOOK = `${BASE_URL}`,
    UPDATEBOOK = `${BASE_URL}`,
    DELETEBOOK = `${BASE_URL}`,
}