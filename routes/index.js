const express = require('express');
const router = express.Router();
const { getClient } = require('../db/db');
const User = require('../models/User');
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        let client = await getClient();
        let qres = await client.query('SELECT * FROM users');
        let users = [];
        qres.rows.forEach((row) => {
            let name = row.first_name + ' ' + row.last_name;
            let user = new User({name, dateCreated: row.date_created, userId: row.user_id, email: row.email});
            users.push(user);
        });
        qres = await client.query('SELECT * FROM posts ORDER BY post_id DESC');
        let posts = [];
        qres.rows.forEach((row) => {
            let user_id = row.user_id;
            let user = null;
            for (let i = 0; i < users.length; ++i) {
                let u = users[i];
                if (u.userId == user_id) user = u;
            };
            if (!user) {
                console.error(`Post ${row.post_id} with user id ${row.user_id} cannot find user.`);
            } else {
                let post = new Post({ user, postId: row.post_id, title: row.title, content: row.content, dateCreated: row.date_created });
                posts.push(post);
            }
        });
        res.render('index', { users, posts, layout: 'layouts/default' });
    } catch(err) {
        res.send('Error: ' + err);
    }
});

router.get('/register', (req, res) => {
    res.render('register', { layout: 'layouts/register' });
});
router.post('/register', async (req, res) => {
    try {
        let client = await getClient();
        let { first_name, last_name, email, password } = req.body;
        let name = first_name + ' ' + last_name;
        let date = Date.now() / 1000;
        let query = `
            INSERT INTO users (first_name, last_name, email, hashed_password, date_created)
            VALUES
                ('${first_name}', '${last_name}', '${email}', '${password}', TO_TIMESTAMP(${date}))
        `;
        let qres = await client.query(query);
        res.send('Success creating user ' + name);
    } catch(err) {
        res.send('Error: ' + err);
    }
});

router.get('/login', (req, res) => {
    res.render('login', { layout: 'layouts/register' });
});

router.get('/userPreferences', (req, res) => {
    res.render('userPreferences', { layout: 'layouts/default' });
});


module.exports = router;
