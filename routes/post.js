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
                RETURNING post_id
        `;
        let qres = await client.query(query);
        let row = qres.rows[0];
        let postId = row.post_id;
        res.redirect(req.baseUrl + '/' + postId);
    } catch(err) {
        res.send('Error: ' + err);
    }
});

router.put('/:postId', async (req, res) => {
    try {
        let client = await getClient();
        let { title, content } = req.body;
        let date = Date.now() / 1000;
        let query = `
            UPDATE posts
            SET title = '${title}',
                content = '${content}'
            WHERE post_id = ${req.params.postId}
            ;
        `;
        let qres = await client.query(query);
        res.redirect(req.baseUrl + '/' + req.params.postId);
    } catch(err) {
        res.send('Error: ' + err);
    }
});

router.delete('/:postId', async (req, res) => {
    let postId = req.params.postId;
    try {
        let client = await getClient();
        let qres = await client.query(`DELETE FROM posts WHERE post_id = ${req.params.postId}`);
        res.send('Post ' + postId + ' successfully deleted.');
    } catch (err) {
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
            let user = new User({data: urow});
            let post = new Post({data: row, user});
            res.render('post', { post, layout: 'layouts/default' });
        } else {
            res.send('Post not found');
        }
    } catch(err) {
        res.send('Error: ' + err);
    }
});



module.exports = router;
