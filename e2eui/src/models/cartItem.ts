import { Book } from "./Book";

export interface CartItem {
    book: Book,
    quantity: any,
    total: any,
}