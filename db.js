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
    try {
        let client = await pool.connect();
        console.log('Connected to db succesfully!');
        return client;
    } catch(err) {
        console.error('Failed to connect to db: ' + err);
        return null;
    }
}

module.exports = {
    getClient,
}
