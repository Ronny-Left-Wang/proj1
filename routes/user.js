const express = require('express');
const router = express.Router();
const { getClient } = require('../db/db');
const User = require('../models/User');
const Post = require('../models/Post');

router.get('/:userId', async (req, res) => {
    try {
        let client = await getClient();
        let qres = await client.query(`SELECT * from users WHERE user_id = ${req.params.userId}`);
        let row = qres.rows[0];
        let name = row.first_name + ' ' + row.last_name;
        let user = new User({data: row});
        if (user) {
            let posts = [];
            qres = await client.query(`SELECT * FROM posts WHERE user_id = ${row.user_id}`);
            qres.rows.forEach((row) => {
                let post = new Post({data: row});
                posts.push(post);
            });
            res.render('user', { user, posts, layout: 'layouts/default' });
        } else {
            res.send('User not found');
        }
    } catch(err) {
        res.send('Error: ' + err);
    }
});


module.exports = router;
