/* Made by Alan Wang
 * I know this is a terrible implementation and I apologize for anyone having to look at this
 */
const { Pool, Client } = require('pg');

let config = {
    user: 'wang',
    database: 'proj1',
    password: 'password'
}

const pool = new Pool(config);

async function getClient() {
    let client = await pool.connect();
    console.log('Connected to db succesfully!');
    return client;
}

module.exports = {
    getClient,
}
