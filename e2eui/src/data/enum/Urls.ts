import * as dotenv from 'dotenv';
dotenv.config();

export const Url = {
    BASEURL: process.env.BASE_URL || '',
    LOGIN: "/login",
    REGISTRATION: "/register",
    CART: "/shopping-cart",
    CHECKOUT: "/checkout",
    ORDER_HISTORY: "/myorders",
    BOOKCATEGORY: "/filter?category=",
    SEARCHEDITEM: "/search?item=",    
    WISHLIST: "/wishlist",
};