/*test script*/

const { getClient } = require('./db');

async function addPost(client) {
    let query = `
        UPDATE posts
        SET content = 'NEW CONTENThelloo'
        WHERE
            user_id = 1;
    `
    let res = await client.query(query);
    console.log("ID 1 content changed");
}

async function pleaseWork() {
    let client = await getClient();
    await addPost(client);
    process.exit();
}

pleaseWork();
