const app = require('express')();
const path = require('path');
const hbs = require('hbs');
const express = require('express');

const User = require('./models/User');
const Post = require('./models/Post');

const indexRoute = require('./routes/index');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user');

const { getClient } = require('./db/db');

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public/'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.use('/', indexRoute);
app.use('/post', postRoute);
app.use('/user', userRoute);

app.get('/register', (req, res) => {
    res.render('register', { layout: 'layouts/register' });
});

app.get('/createPost', (req, res) => {
    res.render('createPost', { layout: 'layouts/default' });
});

app.get('/login', (req, res) => {
    res.render('login', { layout: 'layouts/register' });
});

app.get('/userPreferences', (req, res) => {
    res.render('userPreferences', { layout: 'layouts/default' });
});

app.listen(3000);

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
