/* Made by Alan Wang
 * I know this is a terrible implementation and I apologize for anyone having to look at this
 * Just like my db module :(
 */
const { getClient } = require('./db');

async function dropTables(client) {
    let query = 'SELECT NOW()';
    let res = await client.query(query);
}

getClient().then(client => {
    dropTables(client);
});
