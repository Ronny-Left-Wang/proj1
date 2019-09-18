const express = require('express');
const router = express.Router();
const { getClient } = require('../db/db');
const User = require('../models/User');
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    try {
        let client = await getClient();
        let qres = await client.query('SELECT * from users');
        let users = [];
        qres.rows.forEach((row) => {
            let name = row.first_name + ' ' + row.last_name;
            let user = new User({name, dateCreated: row.date_created, userId: row.user_id, email: row.email});
            users.push(user);
        });
        qres = await client.query('SELECT * from posts');
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

module.exports = router;
