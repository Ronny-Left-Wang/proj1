const { Pool, Client } = require('pg');

const client = new Client({
    user: 'wang',
    database: 'proj1',
    password: 'password'
});

module.exports = {
    client,
}
