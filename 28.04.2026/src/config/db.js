import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config()



const {Pool} = pg;

export const pool = new Pool({
    host: process.env.DB_HOST,//localhost
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
});