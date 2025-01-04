const URL = "api/books";

export enum EndPoint {
    GETALLBOOKS = `${URL}`,
    GETBOOKBYID = `${URL}`,
    CREATEBOOK = `${URL}`,
    UPDATEBOOK = `${URL}`,
    DELETEBOOK = `${URL}`,
}