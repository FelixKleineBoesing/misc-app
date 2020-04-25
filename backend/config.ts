import * as dotenv from 'dotenv';

dotenv.config();
const path = `${__dirname}/.env`;;

dotenv.config({ path });

export const MONGODB_URL = process.env.MONGODB_URL || '';
export const PRIVATE_KEY_JWT = process.env.PRIVATE_KEY_JWT || '';
export const EXPRESS_PORT = process.env.EXPRESS_PORT || '';
export const ADMIN_KEY = process.env.ADMIN_KEY || '';

