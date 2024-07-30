const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

let sessionOptions = session({
    secret: 'JavaScript is soooooo cool',
    store: MongoStore.create({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: "strict"}
});

app.use(sessionOptions);

const router = require('./router');

//telling express to add the users submited data into our request object so then we can acces it from req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use('/', router);

module.exports = app;
