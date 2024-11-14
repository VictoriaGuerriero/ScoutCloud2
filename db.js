const {Pool} = require('pg');
const pool = new Pool({
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'ScoutCloud2'
});

module.exports = pool;

