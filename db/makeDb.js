/* Made by Alan Wang
 * I know this is a terrible implementation and I apologize for anyone having to look at this
 */
const { getClient } = require('./db');

async function dropTables(client) {
    let query = 'DROP TABLE IF EXISTS posts, users';
    let res = await client.query(query);
    console.log('Tables dropped successfully!');
}

async function createTables(client) {
    let query = `
        CREATE TABLE users (
            user_id SERIAL,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            email VARCHAR(255),
            hashed_password VARCHAR(255),
            date_created TIMESTAMP,
            PRIMARY KEY (user_id)
        );
    `;
    let res = await(client.query(query));
    query = `
        CREATE TABLE posts (
            post_id SERIAL,
            user_id INTEGER,
            title VARCHAR(255),
            content TEXT,
            date_created TIMESTAMP,
            PRIMARY KEY (post_id),
            FOREIGN KEY (user_id) REFERENCES users (user_id)
        );
    `;
    res = await(client.query(query));
    console.log('Tables created successfully!');
}

async function fillTables(client) {
    let date = Date.now() / 1000;
    let query = `
            INSERT INTO users (first_name, last_name, email, hashed_password, date_created)
            VALUES
                ('Ronny', 'Ritter', 'ronnyrit@gmail.com', 'loser', TO_TIMESTAMP(${date})),
                ('Brian', 'Johnson', 'kl2kl34kjl@gmail.com', 'loser', TO_TIMESTAMP(${date})),
                ('Lori', 'Muyamiheehee', 'jkfsklfjksdlj1@gmail.com', 'loser', TO_TIMESTAMP(${date})),
                ('Axl', 'Rose', '12939971823jk1kj23jk@gmail.com', 'loser', TO_TIMESTAMP(${date})),
                ('Sam', 'Winchester', 'klsdjkdlflkjm@gmail.com', 'loser', TO_TIMESTAMP(${date})),
                ('Saishruthi', 'Bongo', 'pingas@gmail.com', 'loser', TO_TIMESTAMP(${date})),
                ('Donkey', 'Dong', 'jlkaslkjdjs@gmail.com', 'loser', TO_TIMESTAMP(${date}))
    `;
    let res = await(client.query(query));
    query = `
            INSERT INTO posts (user_id, title, date_created, content)
            VALUES
                (1, 'How is babby formed.', TO_TIMESTAMP(${date}), 'A lecture (from the French lecture, meaning reading) is an oral presentation intended to present information or teach people about a particular subject, for example by a university or college teacher. Lectures are used to convey critical information, history, background, theories, and equations. A politicians speech, a ministers sermon, or even a businessmans sales presentation may be similar in form to a lecture. Usually the lecturer will stand at the front of the room and recite information relevant to the lectures content. Though lectures are much criticised as a teaching method, universities have not yet found practical alternative teaching methods for the large majority of their courses.[1] Critics point out that lecturing is mainly a one-way method of communication that does not involve significant audience participation but relies upon passive learning. Therefore, lecturing is often contrasted to active learning. Lectures delivered by talented speakers can be highly stimulating; at the very least, lectures have survived in academia as a quick, cheap, and efficient way of introducing large numbers of students to a particular field of study.')
    `;
    res = await(client.query(query));
    console.log('Tables succesfully filled with sample data!');
}

async function resetDb() {
    let client = await getClient();
    await dropTables(client);
    await createTables(client);
    await fillTables(client);
    process.exit();
}

resetDb();
