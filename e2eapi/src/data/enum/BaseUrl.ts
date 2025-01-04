import * as dotenv from 'dotenv';
dotenv.config();

export const BaseUrl = {
    LOCAL: process.env.BASE_URL || '',
};