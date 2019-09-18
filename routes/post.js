const express = require('express');
const router = express.Router();
const { getClient } = require('../db/db');

const User = require('../models/User');
const Post = require('../models/Post');

router.get('/create', (req, res) => {
    res.render('createPost', { layout: 'layouts/default' });
});

router.post('/create', async (req, res) => {
    try {
        let client = await getClient();
        //let res = await client.query(``);
        let { title, content } = req.body;
        const user = new User({
            name: 'Guy', dateCreated: Date.now(), userId: '1', email: 'guy@gmail.com'
        });
        let date = Date.now() / 1000;
        let query = `
            INSERT INTO posts (user_id, title, date_created, content)
            VALUES
                (${user.userId}, '${title}', TO_TIMESTAMP(${date}), '${content}')
        `;
        let qres = await client.query(query);
        res.send('Post successfully created');
    } catch(err) {
        res.send('Error: ' + err);
    }
});

router.get('/:postId', async (req, res) => {
    try {
        let client = await getClient();
        let qres = await client.query(`SELECT * from posts WHERE post_id = ${req.params.postId}`);
        let row = qres.rows[0];
        if (row) {
            qres = await client.query(`SELECT * from users WHERE user_id = ${row.user_id}`);
            let urow = qres.rows[0];
            let name = urow.first_name + ' ' + urow.last_name;
            let user = new User({name, dateCreated: urow.date_created, userId: urow.user_id, email: urow.email});
            let post = new Post({ user, postId: row.post_id, title: row.title, dateCreated: row.date_created, content: row.content });
            res.render('post', { post, layout: 'layouts/default' });
        } else {
            res.send('Post not found');
        }
    } catch(err) {
        res.send('Error: ' + err);
    }
});



module.exports = router;
