import * as dotenv from 'dotenv';
dotenv.config();

export const loginData = {
    userDetails: {
        userName: process.env.UI_USERNAME || '',
        password: process.env.PASSWORD || '',
        firstName: "Reformers",
        lastName: "Group46",
        id: "3993"
    },
    invalidUserDetails: {
        userName: "InvalidUserName",
        password: "InvalidPassword",
    },
    isLoggedIn: false
}