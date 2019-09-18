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

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', indexRoute);
app.use('/post', postRoute);
app.use('/user', userRoute);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

