import pg, { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config()



const {Pool} = pg;
export const db = new Pool({
    host: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE
});


const pool = new Pool({
  onConnect: async (client) => {
    await client.query('SET search_path TO my_schema')
  },
})