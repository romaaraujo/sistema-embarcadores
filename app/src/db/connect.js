const { Pool } = require('pg');
require("dotenv/config");

const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432,
    host: process.env.DB_HOST
});

module.exports = { pool };