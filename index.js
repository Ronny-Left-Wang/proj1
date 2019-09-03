const app = require('express')();
const path = require('path');

const User = require('./models/User');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.get('/', (req,res) => {
    res.render('index', { users: getUsers() });
});

app.listen(3000);

let getUsers = () => {
    let users = [
        new User({ name: 'Jolly Roger', dateCreated: Date.now() }),
        new User({ name: 'Ronny Ritter', dateCreated: Date.now() }),
        new User({ name: 'Lori', dateCreated: Date.now() }),
        new User({ name: 'Saishruthi Gnanasekaran', dateCreated: Date.now() }),
    ];
    return users;
}
