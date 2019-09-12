const app = require('express')();
const path = require('path');
const hbs = require('hbs');
const express = require('express');

const User = require('./models/User');
const Post = require('./models/Post');

const { getClient } = require('./db/db');

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public/'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.get('/', async (req, res) => {
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
        res.send(err);
    }
});

app.get('/user/:userId', async (req, res) => {
    try {
        let client = await getClient();
        let qres = await client.query(`SELECT * from users WHERE user_id = ${req.params.userId}`);
        let row = qres.rows[0];
        let name = row.first_name + ' ' + row.last_name;
        let user = new User({name, dateCreated: row.date_created, userId: row.user_id, email: row.email});
        if (user) {
            let posts = [];
            qres = await client.query(`SELECT * FROM posts WHERE user_id = ${row.user_id}`);
            qres.rows.forEach((row) => {
                let post = new Post({ user, postId: row.post_id, title: row.title, content: row.content, dateCreated: row.date_created });
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

app.get('/post/:postId', async (req, res) => {
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

app.get('/register', (req, res) => {
    res.render('register', { layout: 'layouts/register' });
});

app.get('/createPost', (req, res) => {
    /*
    try {
        let client = await getClient();
        let date = Date.now() / 1000;
        let query2 = `
                INSERT INTO posts (user_id, title, date_created, content)
                VALUES
                    (2, Test, TO_TIMESTAMP(${date}), 'HELLO')
            `;
        let post = await client.query(query);
        res.render('createPost', { layout: 'layouts/default' });
    } catch(err) {
        res.send(err);
    }
    */
    res.render('createPost', { layout: 'layouts/default' });
});

app.get('/login', (req, res) => {
    res.render('login', { layout: 'layouts/register' });
});

app.get('/userPreferences', (req, res) => {
    res.render('userPreferences', { layout: 'layouts/default' });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

/*
let getUsers = () => {
    let createUser = name =>
        new User({name : name, dateCreated: Date.now().toString(), userId: Math.ceil(Math.random() * 1000000)});

    let users = [
        createUser('Jolly Roger'),
        createUser('Ronny Ritter'),
        createUser('Lori'),
        createUser('Saishruthi Gnanasekaran'),
    ];
    return users;
}

let users = getUsers();

let getUserById = (id) => {
    for (let i = 0; i < users.length; ++i) {
        if (users[i].userId == id) return users[i];
    }
    return null;
}

let getPosts = () => {
    let getRandomUserId = () => {
        let randIndex = Math.floor(Math.random() * users.length);
        return users[randIndex].userId;
    }

    let createPost = (title, content) => {
        let userId = getRandomUserId();
        return new Post({ user: getUserById(userId), postId: Math.ceil(Math.random() * 100000000), dateCreated: Date.now(), title, content});
    }

    let posts = [
            createPost('What is lorem ipsum?', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'),
            createPost('Bing Bong', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum diam lobortis semper ultrices. Duis id velit sit amet diam malesuada ultrices. Sed tristique odio in orci molestie suscipit. Donec id nulla elit. Etiam interdum lacus vel tellus eleifend congue. Quisque sit amet tempus massa. Ut ac faucibus enim. Proin sit amet nunc eleifend, maximus massa vitae, ultrices turpis. Integer tortor mi, vehicula sit amet tortor ac, sollicitudin finibus felis.< /br>Etiam convallis accumsan ante vel lacinia. Nam a nibh scelerisque, volutpat nibh a, viverra lectus. Suspendisse finibus euismod porttitor. Cras porttitor porta neque, ut accumsan arcu suscipit non. Ut lacus purus, convallis nec luctus et, rhoncus vel orci. Curabitur sed ornare dolor. Nulla at purus accumsan, fringilla lectus ut, tincidunt purus. Vestibulum commodo molestie luctus. Mauris dapibus sagittis ligula at molestie. Curabitur vel volutpat mauris. Cras mollis lectus et sollicitudin condimentum. Aliquam dignissim vitae ligula vitae interdum. Proin et nulla justo. In rhoncus arcu ex, at sagittis ipsum feugiat vel.'),
            createPost('How is babby formed?', 'They need to do way instain mother> who kill thier babbys, becuse these babby cant fright back? It was on the news this mroing a mother in ar who had kill her three kids, they are taking the three babby back to new york too lady to rest. my pary are with the father who lost his chrilden ; i am truley sorry for your lots'),
    ];
    return posts;
}

let posts = getPosts();

let getPostsByUserId = (id) => {
    let res = [];
    for (let i = 0; i < posts.length; ++i) {
        if (posts[i].user.userId == id) res.push(posts[i]);
    }
    return res;
}

let getPostById = (id) => {
    for (let i = 0; i < posts.length; ++i) {
        if (posts[i].postId == id) return posts[i];
    }
    return null;
}
*/
