import pg from 'pg'

const pool = new pg.Pool({
    user: 'user',
    passwork: 'passwork',
    host: 'host',
    port: Number('port'),
    database: 'database'
})

export const query = (text , params) => pool.query(text, params);        