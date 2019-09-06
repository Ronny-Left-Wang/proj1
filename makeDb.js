/* Made by Alan Wang
 * I know this is a terrible implementation and I apologize for anyone having to look at this
 * This is even worse than my db module
 */
const { getClient } = require('./db');

async function dropTables(client) {
    let query = 'DROP TABLE IF EXISTS posts';
    let res = await client.query(query);
    console.log('Tables dropped successfully!');
}

async function createTables(client) {
    let query = `
        CREATE TABLE posts (
            post_id SERIAL,
            title VARCHAR(255),
            content TEXT,
            PRIMARY KEY (post_id)
        );
    `;
    let res = await(client.query(query));
    console.log('Tables created successfully!');
    /*
    let query = `
        CREATE TABLE posts (
            post_id SERIAL,
            user_id INTEGER,
            title VARCHAR(255),
            content TEXT,
            PRIMARY KEY (post_id),
            FOREIGN KEY (user_id) REFERENCES users (user_id)
        );
    `;
    */
}

getClient().then(client => {
    dropTables(client).then(() => { createTables(client);
    });
});
