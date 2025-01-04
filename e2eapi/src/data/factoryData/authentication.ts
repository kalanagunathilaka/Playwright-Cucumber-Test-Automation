import * as dotenv from 'dotenv';
dotenv.config();

export const authentication = {
    admin: process.env.ADMIN_USERNAME || '',
    user: process.env.USER_USERNAME || '',
    unauthorized: "unauthorized",
    password: process.env.PASSWORD || ''
}